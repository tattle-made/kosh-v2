const yargs = require("yargs");
const { config } = require("./config");

const options = yargs
  .usage("Usage : -c <path to csv file>")
  .option("c", {
    alias: "csv-file",
    describe: "Path to the CSV file",
    type: "string",
  })
  .option("m", {
    alias: "media-dir",
    describe: "Path to the directory with all media files",
    type: "string",
  })
  .option("s", {
    alias: "metadata-store-name",
    describe: "Name of the collection in mongo where metadata should be stored",
    type: "string",
  })
  .option("u", {
    alias: "creator-id",
    describe: "UUID of the user",
    type: "string",
    demandOption: true,
  })
  .option("d", {
    alias: "datasource-id",
    describe: "uuid of the datasource",
    type: "string",
    demandOption: true,
  }).argv;

const parameters = {
  csvFilePath: options.csvFile ? options.csvFile : config.CSV_FILE_PATH,
  mediaDirPath: options.mediaDirPath ? options.mediaDir : config.MEDIA_DIR_PATH,
  metadataStoreName: options.metadataStoreName
    ? options.metadataStoreName
    : config.METADATA_STORE_NAME,
  creatorId: options.creatorId,
  datasourceId: options.datasourceId,
};

module.exports = { options, parameters };
