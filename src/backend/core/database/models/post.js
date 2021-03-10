"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init(
    {
      type: DataTypes.ENUM("text", "image", "video"),
      published_at: DataTypes.DATE,
      media_url: DataTypes.STRING,
      preview: DataTypes.STRING,
      creator: DataTypes.UUID,
      datasource: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
