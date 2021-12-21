const { getDatasourceById } = require("./repository-datasource");

const isCreatorOfDataset = async (req) => {
  const { datasourceId } = req.params;
  const { user } = req;
  console.log({ datasetId });
  const dataset = await getDatasourceById(datasetId);
  return dataset != undefined && dataset.creator === user.id;
};

module.exports = {
  isCreatorOfDataset,
};
