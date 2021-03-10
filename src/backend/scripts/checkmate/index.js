const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../..", "development.env"),
});
const fs = require("fs");
const readline = require("readline");
const csv = require("csv-parser");
const { v4: uuid } = require("uuid");
const fsPromise = require("fs").promises;
const { DateTime } = require("luxon");
const { options, parameters } = require("./cli");
const { stats, deriveFileExtention } = require("./ingestion-helper");
const { connect: connectToMongo } = require("../../core/mongo");
const { createPost, createMetadata, ReportManager } = require("./model");
const { upload } = require("./repository-media");
const { save: saveInMongo } = require("./repository-metadata");
const db = require("../../core/database/models");
const { post } = db.sequelize.models;
const reportManager = ReportManager();
const { writeFile } = fsPromise;
const {
  mediaDirPath,
  csvFilePath,
  metadataStoreName,
  creatorId,
  datasourceId,
} = parameters;

console.log(`Running Script with parameters`, parameters);

const ingest = async () => {
  const files = await stats(path.join(__dirname, mediaDirPath));
  console.log(`Contains ${files.length} files`);
  await connectToMongo();

  console.log("Adding Checkmate to Kosh");
  const stream = fs
    .createReadStream(path.join(__dirname, csvFilePath))
    .pipe(csv())
    .on("data", async (data) => {
      try {
        stream.pause();
        const payloadPost = createPost(data, creatorId, datasourceId);
        const payloadMetadata = createMetadata(data);
        const fileId = uuid();

        const filePath = path.join(
          __dirname,
          parameters.mediaDirPath,
          payloadMetadata.filename + "." + deriveFileExtention(payloadPost.type)
        );
        const uploadRes = await upload(filePath, fileId);
        payloadPost.media_url = `https://fs.tattle.co.in/service/kosh/${fileId}`;
        const postRes = await post.create(payloadPost);
        payloadMetadata.fk_kosh = postRes.id;
        await saveInMongo(metadataStoreName, payloadMetadata);
        reportManager.addSuccess(`Successfully ingested ${data._id}`);
      } catch (err) {
        reportManager.addFailure(`Failed ingesting ${data._id}`);
        console.log(`Error Ingesting ${data._id}. Skipping it`);
        console.log(err);
      } finally {
        stream.resume();
      }
    })
    .on("end", async () => {
      console.log(
        `Success : Ingested ${reportManager.getReport().success.length} Rows`
      );

      const reportFilePath = path.join(__dirname, "report.json");
      await writeFile(reportFilePath, reportManager.getReportJSON());
      const uploadRes = await upload(
        reportFilePath,
        `report_${DateTime.now().setZone("Asia/Kolkata")}.json`
      );
      console.log(`Report uploaded to ${uploadRes.Location}`);
      process.exit();
    })
    .on("error", (err) => {
      console.log(
        `Error : could not create read stream for ${parameters.csvFilePath}`
      );
      console.log(err);
    });
};

try {
  ingest();
  // test();
} catch (err) {
  console.log("Error : could not ingest csv file");
}
