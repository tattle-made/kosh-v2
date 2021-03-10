const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../..", "development.env"),
});

const fearspeechData = require("./fear_speech_data.json");
const { v4: uuid } = require("uuid");
const { createPost, createMetadata } = require("./model");
const { uploadData } = require("../../core/s3");
const post = require("../../core/database/models").sequelize.models.post;
const {
  connect: connectToMongo,
  store: storeInMongo,
} = require("../../core/mongo");
const { ReportManager } = require("./model");
const { options, parameters } = require("./cli");
const {
  mediaDirPath,
  csvFilePath,
  metadataStoreName,
  creatorId,
  datasourceId,
} = parameters;

console.log(`Running Script with parameters`, parameters);

console.log("ingesting fear speech data");
const indices = Object.keys(fearspeechData);
const reportManager = ReportManager();

const ingest = async () => {
  await connectToMongo();
  for (const index of indices) {
    console.log(index);
    const data = fearspeechData[index];
    try {
      const postPayload = createPost(data, creatorId, datasourceId);
      const metadataPayload = createMetadata(data);
      const fileId = uuid();

      const uploadRes = await uploadData(data.message_text, fileId);
      console.log(uploadRes.Location);
      postPayload.media_url = `https://fs.tattle.co.in/kosh/${fileId}`;
      const postRes = await post.create(postPayload);
      metadataPayload.fk_kosh = postRes.id;
      await storeInMongo(metadataStoreName, metadataPayload);
      reportManager.addSuccess(`Successfully ingested ${index}`);
      console.log(`Ingested ${index}`);
    } catch (err) {
      console.log(`Error : Could not ingest record ${index}. Skipping it`);
      console.log(err);
    }
  }
  console.log("Finished");
};

try {
  ingest();
} catch (err) {
  console.log(`Error : could not ingest fearspeech into Kosh`);
}
