'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postIndexHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        postIndexHistory.belongsTo(models.post, {foreignKey: "postId"})
    }
  };
  postIndexHistory.init({
    indexer_id: DataTypes.INTEGER,
    post_id: DataTypes.UUID,
    status_code: DataTypes.INTEGER,
    status: DataTypes.ENUM('enqueued', 'processing', 'indexed', 'failed', 'blacklisted')
  }, {
    sequelize,
    modelName: 'postIndexHistory',
  });
  return postIndexHistory;
};