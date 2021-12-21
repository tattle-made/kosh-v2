const { getDatasourceById } = require("./repository-datasource");

const isCreatorOfDataset = async (req) => {
  const { datasourceId } = req.params;
  const { user } = req;
  console.log({ datasourceId, user });
  const dataset = await getDatasourceById(datasourceId);
  return dataset != undefined && dataset.creator === user.id;
};

module.exports = {
  isCreatorOfDataset,
};
