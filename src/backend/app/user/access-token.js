const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const db = require("../../core/database/models");

const { accessToken: AccessToken } = db.sequelize.models;

const createToken = async (request, response) => {
    const user = {
        id: request.user.id,
        username: request.user.username,
        role: request.user.role
    }
    const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
    );
    try {
        await AccessToken.create({
            userId: request.user.id,
            token: accessToken
        })
    } catch (err) {
        console.log("Error : Could not create New Token");
        throw err;
    }
    response
      .status(StatusCodes.OK)
      .send({ token: accessToken });
}

const activeTokens = async (request, response) => {
    let tokens;
    try {
        tokens = await AccessToken.findAll({
            where: {
              userId: request.user.id,
              status: "active"
            },
          });
    } catch (err) {
        console.log("Error : Could not Fetch Tokens at the moment");
        throw err;
    }
    response
      .status(StatusCodes.OK)
      .send(tokens);
}

const deleteToken = async (request, response) => {
    let token;
    try {
        token = await AccessToken.findOne({
            where: {
                id: request.params.id,
                userId: request.user.id,
                status: "active"
            },
        });
        if (!token) {
            throw new Error(
                "Error: invalid token"
            );
        }
        await token.update({
            status: "inactive"
        });
    } catch (err) {
        console.log("Error : Could not Delete Token");
        throw err;
    }
    response
      .status(StatusCodes.OK)
      .send({ message: "Token Deleted" });
}

module.exports = {createToken, activeTokens, deleteToken}