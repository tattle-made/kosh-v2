"use strict";
const { v4: uuidv4 } = require("uuid");
const generatePassword = require("password-generator");
const bcrypt = require("bcrypt");

const time_of_run = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("Abcdef123$", 10);
    console.log(hashedPassword);
    const users = await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        username: "admin",
        email: "admin@tattle.co.in",
        password: hashedPassword,
        role: "admin",
        status: "verified",
        verificationToken: null,
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),
        username: "demo",
        email: "demo@tattle.co.in",
        password: hashedPassword,
        role: "author",
        status: "verified",
        verificationToken: null,
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),
        username: "author",
        email: "author@tattle.co.in",
        password: hashedPassword,
        role: "reader",
        status: "verified",
        verificationToken: null,
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
    ]);

    const doubleUserIds = await queryInterface.sequelize.query(
      `SELECT id from users where email='demo@tattle.co.in';`
    );
    const demoUser = doubleUserIds[0][0];
    console.log(demoUser);

    const datasources = await queryInterface.bulkInsert("datasources", [
      {
        id: uuidv4(),
        name: "checkmate",
        description:
          "A novel dataset that can be used to prioritize check-worthy posts from multi-media content in Hindi.",
        creator: demoUser.id,
        visibility: "public",
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),

        name: "fearspeech",
        description:
          "Collection of whatsapp messages collected during 2019 Indian General Elections",
        creator: demoUser.id,
        visibility: "public",
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),
        name: "factcheck",
        description:
          "Tattle's database of media items scraped from IFCN certified Indian fact checkers",
        creator: demoUser.id,
        visibility: "public",
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete("users", null, {}),
      queryInterface.bulkDelete("datasources", null, {}),
    ]);
  },
};
