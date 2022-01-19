"use strict";
const { v4: uuidv4 } = require("uuid");
const generatePassword = require("password-generator");
const bcrypt = require("bcrypt");

const time_of_run = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password_admin = generatePassword();
    const password_author = generatePassword();
    const password_reader = generatePassword();
    console.log({ password_admin, password_author, password_reader });
    const hashedPasswordAdmin = await bcrypt.hash(password_admin, 10);
    const hashedPasswordAuthor = await bcrypt.hash(password_author, 10);
    const hashedPasswordReader = await bcrypt.hash(password_reader, 10);
    // console.log(hashedPassword);
    const users = await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        username: "admin",
        email: "admin@tattle.co.in",
        password: hashedPasswordAdmin,
        role: "admin",
        status: "verified",
        verificationToken: null,
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),
        username: "author",
        email: "author@tattle.co.in",
        password: hashedPasswordAuthor,
        role: "author",
        status: "verified",
        verificationToken: null,
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),
        username: "reader",
        email: "reader@tattle.co.in",
        password: hashedPasswordReader,
        role: "reader",
        status: "verified",
        verificationToken: null,
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
    ]);

    const doubleUserIds = await queryInterface.sequelize.query(
      `SELECT id from users where email='author@tattle.co.in';`
    );
    const demoUser = doubleUserIds[0][0];
    console.log(demoUser);

    const datasources = await queryInterface.bulkInsert("datasources", [
      {
        id: uuidv4(),
        name: "Fact Check Article Media",
        description:
          "A novel dataset that can be used to prioritize check-worthy posts from multi-media content in Hindi.",
        creator: demoUser.id,
        visibility: "public",
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),

        name: "Fear Speech",
        description:
          "Collection of whatsapp messages collected during 2019 Indian General Elections",
        creator: demoUser.id,
        visibility: "public",
        createdAt: time_of_run,
        updatedAt: time_of_run,
      },
      {
        id: uuidv4(),
        name: "Election memes from Whatsapp",
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
