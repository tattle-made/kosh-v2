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

// everyone has read access to a post if they have a token
// users can only update or post new data if they own the dataset
// todo define sql calls etc to check ownership checks
// this is great coz all the parameters needed to check condition is in req
// so
const routesPermissionsMap = {
  datasets: {
    GET: ["admin", "author", "viewer"],
    POST: [
      "admin",
      { role: "author", condition: isCreatorOfDataset },
      { role: "reader", condition: isCreatorOfDataset },
    ],
  },
};

/**
 * This middleware does
 * 1. role check : send 401 Forbidden status if the user does not have apt role to access
 * an endpoint
 * 2. ownership check : sends 401 Forbidden status if the user does not own the resource
 * specified in the request
 */
const authorizationMiddleware = async (req, res, next) => {
  const { user } = req;
  if (user.id) {
    if (user.role === "admin") {
      next();
    } else {
      const url = req.originalUrl.split("?")[0];
      const resource = url.split("/")[1];
      const action = req.method;
      const role = user.role;

      console.log({ resource, action, user: user.id });
      const conditions = routesPermissionsMap[resource][action];
      const condition = conditions.filter(
        (cond) => cond === role || cond.role === role
      )[0];
      req.accessCondition = condition.condition;
      next();
    }
  }
};

module.exports = {
  authorizationMiddleware,
};
