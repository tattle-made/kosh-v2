const axios = require("axios");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");
require("dotenv").config({
  path: path.join(__dirname, "development.env"),
});
const stories = require("./fear_speech_data.json");
const { bulkWrite, connect } = require("../backend/core/mongo");

const FACTCHECK_DB = "kosh_metadata";
const METADATA_COLLECTION = "kosh_metadata";
const accessToken = process.env.ACCESS_TOKEN;
const datasource = "8a46cda5-717a-47d7-bbc2-1e239e89cef8";
const failedRequestsFile = "fear-speech-failed-requests.json";

const insertPost = async () => {
  const posts = [];
  for (const post of Object.values(stories)) {
    const fileId = uuid();
    const { uploadData } = require("./s3");
    await uploadData(JSON.stringify(post.message_text, "utf-8"), fileId);
    post.s3URL = "https://fs.tattle.co.in/service/kosh/file/" + fileId;
    posts.push({
      id: uuid(),
      type: "text",
      media_url: post.s3URL,
      preview: post.message_text && post.message_text.slice(0, 254),
      datasource,
      annotation_list: post.annotation_list,
      propagation: post.propagation,
      translated_text: post.translated_text,
    });
  }
  const result = { totalPosts: posts.length, failed: [] };
  const batchSize = 100;
  for (let i = 0, j = posts.length; i < j; i += batchSize) {
    const batch = posts.slice(i, i + batchSize);
    const payload = batch.map((post) => {
      return {
        id: post.id,
        type: post.type,
        media_url: post.media_url,
        preview: post.preview,
        datasource,
      };
    });
    try {
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
    await insertMetaData(batch);
  }
  console.log("\n");
  if (result.failed.length) {
    fs.writeFileSync(failedRequestsFile, JSON.stringify(result.failed), {
      encoding: "utf-8",
    });
    console.log(`check ${failedRequestsFile} file for failed posts`);
  }
  console.log("Total Posts: " + result.totalPosts);
  console.log("Failed: " + result.failed.length);
  console.log("done");
  process.exit(0);
};

async function insertMetaData(batch) {
  await connect();
  const insertPostMetadata = batch.map((post) => {
    return {
      insertOne: {
        e_kosh_id: post.id,
        annotation_list: post.annotation_list,
        propagation: post.propagation,
        translated_text: post.translated_text,
      },
    };
  });
  await bulkWrite(FACTCHECK_DB, METADATA_COLLECTION, insertPostMetadata);
}

try {
  insertPost();
} catch (e) {
  console.log(e);
}
