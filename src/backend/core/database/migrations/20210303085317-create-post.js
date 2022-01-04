"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      type: {
        type: Sequelize.ENUM("text", "image", "video"),
      },
      creator: {
        type: Sequelize.UUID,
      },
      datasource: {
        type: Sequelize.UUID,
      },
      published_at: {
        type: Sequelize.DATE,
      },
      media_url: {
        type: Sequelize.STRING,
      },
      preview: {
        type: Sequelize.STRING,
      },
      index_status: {
        type: Sequelize.ENUM('enqueued', 'processing', 'indexed', 'failed', 'blacklisted')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts");
  },
};
