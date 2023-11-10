"use strict";
const { v4: uuidv4 } = require("uuid");
const time_of_run = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const doubleUserIds = await queryInterface.sequelize.query(
      `SELECT id from users where email='author@tattle.co.in';`
    );
    const demoUser = doubleUserIds[0][0];
    console.log(demoUser);

    const datasources = await queryInterface.bulkInsert("datasources", [
      {
        id: uuidv4(),
        name: "Manipur",
        description:
          "Content captured on Instagram and webpages during the manipur crisis",
        creator: demoUser.id,
        visibility: "public",
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([]);
  },
};
