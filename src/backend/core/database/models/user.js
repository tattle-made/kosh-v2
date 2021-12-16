"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      user.hasMany(models.accessToken, {as: 'accessTokens'})
    }
    getPublicProfile() {
      return {
        id: this.id,
        username: this.username,
        role: this.role,
      };
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "editor", "author", "reader"),
        defaultValue: "reader",
      },
      status: {
        type: DataTypes.ENUM("verified", "unverified", "blocked", "deleted"),
        defaultValue: "unverified",
      },
      verificationToken: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
