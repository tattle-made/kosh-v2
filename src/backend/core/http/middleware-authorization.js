const { StatusCodes } = require("http-status-codes");
const {
  getDatasourceById,
} = require("../../app/data-source/repository-datasource");

const isCreatorOfDataset = async (req) => {
  const { datasetId } = req.params;
  const { user } = req;
  console.log({ datasetId });
  const dataset = await getDatasourceById(datasetId);
  return dataset != undefined && dataset.creator === user.id;
};

/**
 * @param {function} role is a user's role. expedted values = "viewer", "author", "editor"
 * @returns an instruction. its shape is {role:condition}, where condition is a function that returns true or false
 * conditionType can only be "allow" or "block" for now
 */
const ConditionFactory = (conditionType) => {
  return (role) => {
    let instruction = {
      [role]: () =>
        conditionType === "allow"
          ? true
          : conditionType === "block"
          ? false
          : true,
    };

    return {
      ...instruction,
      onCondition: (func) => {
        return {  [role]: func  };
      },
    };
  };
},

const guard = {
  allow: ConditionFactory("allow"),
  block: ConditionFactory("block"),
  middleware: (instructions) => {
    return async function (req, res, next) {
      for (let i = 0; i < instructions.length; i++) {
        const requestShouldProceed = await instructions.condition(req);
        if (requestShouldProceed) {
          next();
        } else {
          res.status(StatusCodes.FORBIDDEN).send("Unauthorized Access");
        }
      }
    };
  },
};

module.exports = {
  guard,
};
