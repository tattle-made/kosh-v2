// ensure that following environment variabels are set
// ACCESS_TOKEN, API_URL, MONGO_DB_URL
const { initialize } = require("./environment");
initialize(process.argv[0]);
const { v4: uuid } = require("uuid");
const { readdir, writeFile, readFile } = require("node:fs/promises");
const axios = require("axios");
const { bulkWrite, connect } = require("../backend/core/mongo");

const FACTCHECK_DB = "kosh_metadata";
const METADATA_COLLECTION = "kosh_metadata";
const accessToken = process.env.ACCESS_TOKEN;
const datasource = "f5bf1f88-cffe-47e1-9383-ad17780e8886";
const failedRequestsFile = "manipur-failed-requests.json";

console.log(
  `Uploading to ${process.env.API_URL} and ${process.env.MONGO_DB_URL}`
);

const FILE_TYPE = {
  jpg: "image",
  mp4: "video",
  txt: "text",
};

let count = {
  image: 0,
  video: 0,
  text: 0,
  unsupported: 0,
};

let unsupported = new Set();

async function insertMetaData(batch) {
  await connect();
  const insertPostMetadata = batch.map((post) => {
    return {
      insertOne: {
        e_kosh_id: post.id,
        timestamp: post.timestamp,
        handle: post.handle,
      },
    };
  });
  await bulkWrite(FACTCHECK_DB, METADATA_COLLECTION, insertPostMetadata);
}

const insertPost = async () => {
  const posts = [];

  const media_dirs = await readdir("../../../kosh-manipur");
  for (const dir of media_dirs) {
    console.log(dir);
    const media_files = await readdir(`../../../kosh-manipur/${dir}`);

    for (const file of media_files) {
      const unvalidatedFileType = FILE_TYPE[file.split(".")[1]];
      const fileType = unvalidatedFileType
        ? unvalidatedFileType
        : "unsupported";

      count[fileType]++;

      if (fileType != "unsupported") {
        let preview;
        if (fileType === "text") {
          const content = await readFile(
            `../../../kosh-manipur/${dir}/${file}`,
            "utf8"
          );
          preview = content.slice(0, 254);
        } else {
          preview = `http://localhost:8081/${dir}/${file}`;
        }

        const timestamp = file.split("_UTC")[0];
        [year, month, day, hour, minute, second] = timestamp
          .replaceAll("_", "-")
          .split("-");
        const jsTimestamp = new Date(
          `${year}-${month}-${day}T${hour}:${minute}:${second}`
        );

        posts.push({
          id: uuid(),
          type: fileType,
          media_url: `http://localhost:8081/${dir}/${file}`,
          preview,
          timestamp: jsTimestamp.toISOString(),
          handle: dir,
          datasource,
        });
      }
    }
  }

  console.log(count);
  await writeFile(`posts.json`, JSON.stringify(posts));

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

try {
  insertPost();
} catch (e) {
  console.log(e);
}
