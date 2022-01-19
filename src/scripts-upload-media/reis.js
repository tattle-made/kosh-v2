const axios = require("axios");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { v4: uuid } = require("uuid");
require("dotenv").config({
  path: path.join(__dirname, "development.env"),
});
const { uploadData } = require("./s3");
const { connect, bulkWrite } = require("../backend/core/mongo/index");

const FACTCHECK_DB = "kosh_metadata";
const METADATA_COLLECTION = "kosh_metadata";
const accessToken = process.env.ACCESS_TOKEN;
const datasource = "883176d5-77c5-11ec-957f-0242ac160005";
const failedRequestsFile = "reis-failed-requests.json";
const reisDatasetFolder = "./reis-data";
const delimiter = "	";

async function readLines(basePath) {
  const fileStream = fs.createReadStream(basePath + "_anonymized.txt");
  fileStream.on("error", (e) => {
    console.log(basePath + "_anonymized.txt file not present \n", e);
    return [];
  });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const posts = [];
  for await (const line of rl) {
    const columns = line.split(delimiter);
    if (columns[0] === "group_id") continue;
    const fileId = uuid();
    const imageFileName = columns[3];
    const imageFileStream = fs.createReadStream(
      path.join(basePath, imageFileName)
    );
    await uploadData(imageFileStream, fileId);
    const s3URL = "https://fs.tattle.co.in/service/kosh/file/" + fileId;
    posts.push({
      id: uuid(),
      type: "image",
      group_id: columns[0],
      user_id: columns[1],
      image_id: columns[2],
      media_url: s3URL,
      timestamp: columns[4],
    });
  }
  return posts;
}

const sendRequests = async (posts) => {
  const batchSize = 100;
  const result = { totalPosts: posts.length, failed: [] };
  for (let i = 0, j = posts.length; i < j; i += batchSize) {
    const batch = posts.slice(i, i + batchSize);
    const payload = batch.map((post) => {
      return {
        id: post.id,
        type: post.type,
        media_url: post.media_url,
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
    await insertMetadata(batch);
  }
  return result;
};

async function insertMetadata(batch) {
  const insertPostMetadata = batch.map((post) => {
    return {
      insertOne: {
        e_kosh_id: post.id,
        group_id: post.group_id,
        user_id: post.user_id,
        image_id: post.image_id,
        media_url: post.media_url,
        timestamp: post.timestamp,
      },
    };
  });
  await bulkWrite(FACTCHECK_DB, METADATA_COLLECTION, insertPostMetadata);
}

const insertPost = async () => {
  await connect();
  const result = { totalPosts: 0, failed: [], filesDone: [] };
  const folders = fs
    .readdirSync(reisDatasetFolder)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
  for (const country of folders) {
    const imageFolders = fs
      .readdirSync(`./${reisDatasetFolder}/${country}`)
      .filter((item) => !/(^|\/)\.[^\/\.]|.txt/g.test(item));
    for (const type of imageFolders) {
      const posts = await readLines(
        `./${reisDatasetFolder}/${country}/${type}`,
        { encoding: "utf-8" }
      );
      if (!posts.length) continue;
      const response = await sendRequests(posts);
      console.log(`${reisDatasetFolder}/${country}/${type} ---` + response);
      result.totalPosts += response.totalPosts;
      result.failed.push(...response.failed);
      result.filesDone.push(`${reisDatasetFolder}/${country}/${type}`);
    }
  }
  if (result.failed.length) {
    fs.writeFileSync(failedRequestsFile, JSON.stringify(result.failed), {
      encoding: "utf-8",
    });
    console.log(`check ${failedRequestsFile} file for failed posts`);
  }
  console.log("Files completed: " + result.filesDone);
  console.log("Total Posts: " + result.totalPosts);
  console.log("Failed: " + result.failed.length);
  console.log("done");
  process.exit(0);
};

insertPost();
