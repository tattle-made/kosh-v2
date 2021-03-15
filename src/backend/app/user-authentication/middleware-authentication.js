const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    user.getPublicProfile(),
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    user.getPublicProfile(),
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return refreshToken;
};

const verifyRefreshToken = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return user;
  } catch (error) {
    console.log("Error : Could not verify refresh token", error);
    throw new Error("Could not check validity of login");
  }
};

const authenticationMiddleware = async (req, res, next) => {
  // extract token from request headers

  if (
    req.originalUrl.startsWith("/auth/") ||
    req.originalUrl.startsWith("/pages/") ||
    req.originalUrl.startsWith("/health-check")
  ) {
    next();
  } else {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Access Token is missing" });
      } else {
        try {
          const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          req.user = user;
          next();
        } catch (error) {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ error: "Your token has expired. Please refresh it" });
        }
      }
    } catch (error) {
      console.log("Error : Could not authenticate request", error);
      throw new Error("Could not authenticate request");
    }
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  authenticationMiddleware,
};
