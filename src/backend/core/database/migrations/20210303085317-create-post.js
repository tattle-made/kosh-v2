"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
