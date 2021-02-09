const express = require("express");
const bodyParser = require("body-parser");
const {
  authenticationMiddleware,
} = require("../../app/user-authentication/middleware-authentication");

const expressApp = express();

const configure = (expressApp) => {
  expressApp.use(bodyParser.urlencoded());
  expressApp.use(bodyParser.json());
  expressApp.use(authenticationMiddleware);
  return expressApp;
};

const start = (expressApp, port) => {
  return expressApp.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
};

module.exports = { expressApp, configure, start };
