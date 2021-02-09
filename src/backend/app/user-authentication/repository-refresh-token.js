const db = require("../../core/database/models");

const { refreshToken } = db.sequelize.models;

const add = async ({ token }) => {
  try {
    await refreshToken.create({ token: token });
  } catch (error) {
    console.log("Error: could not store refresh token");
    throw error;
  }
};

const remove = async ({ token }) => {
  try {
    await refreshToken.destroy({
      where: {
        token,
      },
    });
  } catch (error) {
    console.log("Error : could not remove refresh token");
    throw error;
  }
};

const isValid = async (token) => {
  try {
    const result = await refreshToken.findOne({ where: { token } });
    return result === null ? false : true;
  } catch (error) {
    console.log(
      "Error : could not check the validity of refresh token ",
      error
    );
    throw new Error("We are unsure if the token is valid");
  }
};

module.exports = {
  add,
  remove,
  isValid,
};
