const { expressApp, configure, start } = require("./core/http/index");
const { configure: configureHealthCheck } = require("./app/health-check/index");
const {
  configure: configureAuthentication,
} = require("./app/user-authentication/index");
const {
  configureRoutes: configureDataRoutes,
} = require("./app/data-source/index");
const config = require("config");
const { connect: connectToMongo } = require("./core/mongo");

const PORT = config.get("express.port");

configure(expressApp);
configureHealthCheck(expressApp);
configureAuthentication(expressApp);
configureDataRoutes(expressApp);

const startServer = async () => {
  await connectToMongo();
  start(expressApp, PORT);
};

startServer();
