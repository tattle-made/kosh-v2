// import { TEST } from "./test.js";
const { expressApp, configure, start } = require("./core/http/index");
const { configure: configureHealthCheck } = require("./app/health-check/index");
const {
  configure: configureAuthentication,
} = require("./app/user-authentication/index");
const config = require("config");

const PORT = config.get("express.port");

configure(expressApp);
configureHealthCheck(expressApp);
configureAuthentication(expressApp);

start(expressApp, PORT);
