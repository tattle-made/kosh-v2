const { StatusCodes } = require("http-status-codes");

const configure = (expressApp) => {
  expressApp.get("/health-check", (req, res) => {
    res.send("Health Check OK!");
  });

  expressApp.get("/user", (req, res) => {
    res.status(StatusCodes.OK).send(req.user);
  });
  return expressApp;
};

module.exports = { configure };
