"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
    }
    findByEmail(email) {}
    save(username, email, password) {}
    findByVerifyToken(token) {}
  }
  user.init(
    {
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "editor", "author", "reader"),
      status: DataTypes.ENUM("verified", "unverified", "blocked", "deleted"),
      // verifyToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
