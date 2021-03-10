const yargs = require("yargs");
const { config } = require("./config");

const options = yargs
  .usage("Usage : -c <path to csv file>")
  .option("s", {
    alias: "metadata-collection-name",
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
  metadataCollectionName: options.metadataStoreName
    ? options.metadataStoreName
    : config.METADATA_COLLECTION_NAME,
  creatorId: options.creatorId,
  datasourceId: options.datasourceId,
};

module.exports = { options, parameters };
