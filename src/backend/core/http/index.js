const express = require("express");
const bodyParser = require("body-parser");
const {
  authenticationMiddleware,
} = require("../../app/user-authentication/middleware-authentication");
const cors = require("cors");
// const { authorizationMiddleware } = require("./middleware-authorization");

const expressApp = express();

const configure = (expressApp) => {
  expressApp.use(
    cors({
      origin: "*",
    })
  );

  expressApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
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
