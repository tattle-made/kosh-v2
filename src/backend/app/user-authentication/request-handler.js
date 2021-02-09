const { StatusCodes } = require("http-status-codes");
const {
  create,
  verifyToken,
  findByEmailPassword,
} = require("./repository-user");
const {
  add: addToken,
  remove: removeToken,
  isValid,
} = require("./repository-refresh-token");
const { newSignupPayload: validateSignupPayload } = require("./validator-http");
const { sendEmail } = require("../../core/email");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("./middleware-authentication");

const signUp = async (requestBody, response) => {
  try {
    const { email, password } = requestBody;
    const validatedPayload = await validateSignupPayload({ email, password });
    const newUser = await create(validatedPayload);

    sendEmail({
      subject: "Email Verification for Kosh",
      body: `Please complete your registration by visiting this link https://kosh.tattle.co.in/email-verification?token=${newUser.verificationToken}`,
      receiver: newUser.email,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    await addToken({ token: refreshToken });
    response.status(StatusCodes.OK).send({
      ...newUser.getPublicProfile(),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log("Error Signing up User ", err);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: err.message });
  }
};

const emailVerification = async (requestQuery, response) => {
  const { token } = requestQuery;

  try {
    const user = await verifyToken({ verificationToken: token });
    response.status(StatusCodes.OK).send({ user: user.getPublicProfile() });
  } catch (error) {
    console.log("Error : Could not verify token");
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
};

const me = async (request, response) => {};

const login = async (requestBody, response) => {
  const { email, password } = requestBody;
  try {
    const user = await findByEmailPassword({ email, password });

    if (user.status === "verified") {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await addToken({ token: refreshToken });

      response
        .status(StatusCodes.OK)
        .send({ ...user.getPublicProfile(), accessToken, refreshToken });
    } else {
      response.status(StatusCodes.OK).send({
        message: `This user is not allowed to login because they are ${user.status}`,
      });
    }
  } catch (error) {
    console.log("Error : Could not login user ", error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Could not login user" });
  }
};

const refreshToken = async (requestBody, response) => {
  const { token } = requestBody;
  if (token === undefined) {
    response.status(StatusCodes.BAD_REQUEST);
  }

  const isTokenValid = await isValid(token);
  if (!isTokenValid) {
    response
      .status(StatusCodes.FORBIDDEN)
      .send({ error: "User is not permitted to do this operation" });
  }

  try {
    const userData = await verifyRefreshToken(token);
    const user = {
      getPublicProfile: () => ({
        id: userData.id,
        username: userData.username,
        role: userData.role,
      }),
    };
    const accessToken = generateAccessToken(user);
    response.status(StatusCodes.OK).send({ accessToken });
  } catch (error) {
    console.log("Error : could not refresh token", error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Could not refresh token" });
  }
};

const logout = async () => {
  const { token } = requestBody;
  try {
    await removeToken({ token });
    response.status(StatusCodes.OK).send({ message: "token refreshed" });
  } catch (error) {
    console.log("Error : Could not refresh token", error);
    throw new Error("Could not refresh token");
  }
};

module.exports = {
  signUp,
  emailVerification,
  login,
  logout,
  refreshToken,
};
