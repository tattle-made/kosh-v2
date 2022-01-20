const path = require("path");

environment = process.argv[2];

function initialize() {
  if (environment == "PRODUCTION") {
    require("dotenv").config({
      path: path.join(__dirname, "production.env"),
    });
  } else if (environment == "DEVELOPMENT") {
    require("dotenv").config({
      path: path.join(__dirname, "development.env"),
    });
  } else {
    throw "Unexpected environment variable. Please choose either DEVELOPMENT or PRODUCTION";
  }
}

module.exports = {
  initialize,
  environment,
};
