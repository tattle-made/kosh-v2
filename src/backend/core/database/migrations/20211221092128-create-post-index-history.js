'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('postIndexHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      indexer_id: {
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.UUID
      },
      status_code: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('enqueued', 'processing', 'indexed', 'failed', 'blacklisted')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('postIndexHistories');
  }
};