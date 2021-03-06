const { initialize } = require("./environment");
initialize(process.argv[0]);
const axios = require("axios");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { connect, get, bulkWrite } = require("../backend/core/mongo/index");

console.log(
  `Uploading to ${process.env.API_URL} and ${process.env.MONGO_DB_URL}`
);

const FACTCHECK_DB = "factcheck_sites";
const FACTCHECK_COLLECTION = "stories";
const METADATA_DB = "kosh_metadata";
const METADATA_COLLECTION = "kosh_metadata";
const accessToken = process.env.ACCESS_TOKEN;
const datasource = "627b83e2-03b3-449c-a2bf-72d8a664ba93";
const knownMediaTypes = ["text", "image"];
const ignoreMediaTypes = ["tweet", "facebook", "instagram", "video"];
const failedRequestsFile = "factcheck-failed-requests.json";

const insertPosts = async () => {
  await connect();

  const stories = await get(
    FACTCHECK_DB,
    FACTCHECK_COLLECTION,
    {
      "docs.e_kosh_id": { $exists: false },
      "docs.mediaType": { $nin: ignoreMediaTypes },
    }
    // { limit: 100, skip: 0 }
  );
  console.log("fetched stories from factcheck db");
  const result = { totalPosts: 0, failed: [] };
  const posts = [];
  const unknownMediaTypes = new Set();
  for await (const story of stories) {
    if (!story.docs || !Array.isArray(story.docs)) {
      continue;
    }
    for (const post of story.docs) {
      if (post.e_kosh_id) continue;
      if (!knownMediaTypes.includes(post.mediaType)) {
        unknownMediaTypes.add(post.mediaType);
        continue;
      }
      if (post.mediaType === "text" && !post.s3URL) {
        const fileId = uuid();
        const { uploadData } = require("./s3");
        console.log(`uploading text for ${post.postID}`);
        await uploadData(JSON.stringify(post.content, "utf-8"), fileId);
        post.s3URL = "https://fs.tattle.co.in/service/kosh/file/" + fileId;
      }
      posts.push({
        id: uuid(),
        doc_id: post.doc_id,
        published_at: story.date_updated,
        type: post.mediaType,
        media_url: post.s3URL,
        preview: post.content && post.content.slice(0, 254),
        datasource,
        postURL: story.postURL,
        domain: story.domain,
        headline: story.headline,
      });
    }
  }
  result.totalPosts = posts.length;
  const batchSize = 100;
  for (let i = 0, j = posts.length; i < j; i += batchSize) {
    const batch = posts.slice(i, i + batchSize);
    const payload = batch.map((post) => {
      return {
        id: post.id,
        published_at: post.published_at,
        type: post.type,
        media_url: post.media_url,
        preview: post.preview,
        datasource,
      };
    });
    try {
      console.log(`attempting to POST to kosh ${posts.length} posts`);
      await axios.post(
        process.env.API_URL + `/datasource/${datasource}/posts`,
        { posts: payload },
        { headers: { Authorization: "Bearer " + accessToken } }
      );
    } catch (e) {
      console.log(e);
      result.failed.push(...batch);
      continue;
    }
    await updateKoshIdToMetadata(batch);
    console.log("inserting metadata");
    await insertMetadata(batch);
  }
  console.log("\n");
  if (result.failed.length) {
    fs.writeFileSync(failedRequestsFile, JSON.stringify(result.failed), {
      encoding: "utf-8",
    });
    console.log(`check '${failedRequestsFile}' file for failed posts`);
  }
  console.log(
    "UnknownMediaTypes: " +
      (unknownMediaTypes.size ? unknownMediaTypes : "None")
  );
  console.log("Total Posts: " + result.totalPosts);
  console.log("Failed: " + result.failed.length);
  console.log("Done");
  process.exit(0);
};

async function updateKoshIdToMetadata(batch) {
  const writeOperation = batch.map((post) => {
    return {
      updateOne: {
        filter: { "docs.doc_id": post.doc_id },
        update: { $set: { "docs.$[element].e_kosh_id": post.id } },
        arrayFilters: [{ "element.doc_id": post.doc_id }],
      },
    };
  });
  await bulkWrite(FACTCHECK_COLLECTION, FACTCHECK_COLLECTION, writeOperation);
}

async function insertMetadata(batch) {
  const insertPostMetadata = batch.map((post) => {
    console.log({ e_kosh_id: post.id });
    return {
      insertOne: {
        e_kosh_id: post.id,
        postURL: post.postURL,
        domain: post.domain,
        headline: post.headline,
        date_updated: post.published_at,
      },
    };
  });
  await bulkWrite(METADATA_DB, METADATA_COLLECTION, insertPostMetadata);
}

try {
  insertPosts();
} catch (e) {
  console.log(e);
}
