const {
  signUp,
  login,
  emailVerification,
  logout,
  refreshToken,
} = require("./request-handler");

const configure = (expressApp) => {
  expressApp.post("/auth/signup", (req, res) => {
    signUp(req.body, res);
  });

  expressApp.get("/auth/email-verification", (req, res) => {
    emailVerification(req.query, res);
  });

  expressApp.post("/auth/login", (req, res) => {
    login(req.body, res);
  });

  expressApp.post("/auth/refresh-token", (req, res) => {
    refreshToken(req.body, res);
  });

  expressApp.delete("/auth/logout", (req, res) => {
    logout(req.body, res);
  });

  return expressApp;
};

module.exports = { configure };
