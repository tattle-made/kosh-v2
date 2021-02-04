const express = require("express");
const bodyParser = require("body-parser");

const expressApp = express();

const configure = (expressApp) => {
  expressApp.use(bodyParser.urlencoded());
  expressApp.use(bodyParser.json());
  return expressApp;
};

const start = (expressApp, port) => {
  return expressApp.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
};

module.exports = { expressApp, configure, start };
