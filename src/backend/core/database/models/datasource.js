"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datasource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      datasource.hasMany(models.post, {as: 'post', foreignKey: 'datasource'})
    }
  }
  datasource.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      creator: DataTypes.UUID,
      visibility: DataTypes.ENUM("private", "public"),
    },
    {
      sequelize,
      modelName: "datasource",
    }
  );
  return datasource;
};
