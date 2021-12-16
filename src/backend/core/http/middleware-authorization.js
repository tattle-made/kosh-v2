const { StatusCodes } = require("http-status-codes");
const {
  getDatasourceById,
} = require("../../app/data-source/repository-datasource");

const isCreatorOfDataset = async (req) => {
  const { datasetId } = req.params;
  const { user } = req;
  const dataset = await getDatasourceById(datasetId);
  return dataset.creator == user.id;
};

// everyone has read access to a post if they have a token
// users can only update or post new data if they own the dataset
// todo define sql calls etc to check ownership checks
// this is great coz all the parameters needed to check condition is in req
// so
const routesPermissionsMap = {
  "/api/datasets/:datasetId/posts/:postId": {
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
  if (user) {
    if (user.role === "admin") {
      next();
    } else {
      // rolecheck
      const rolesAllowedOnThisRoute = routesPermissionsMap[req.path][req.type];
      const { role, condition } = [
        rolesAllowedOnThisRoute.filter((role) => role.role === user.role),
      ][0];
      if (role) {
        if (condition(req)) {
          next();
        }
        res
          .status(StatusCodes.FORBIDDEN)
          .message("You are not authorized to access this resource");
      }
    }
  }
};

module.exports = {
  authorizationMiddleware,
};
