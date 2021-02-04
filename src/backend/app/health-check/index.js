const configure = (expressApp) => {
  expressApp.get("/health-check", (req, res) => {
    res.send("Health Check OK!");
  });
  return expressApp;
};

module.exports = { configure };
