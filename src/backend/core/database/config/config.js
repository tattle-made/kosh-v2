module.exports = {
  development: {
    username: "user_name",
    password: "user_pw",
    database: "kosh",
    host: "db",
    dialect: "mysql",
  },
  staging: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE_NAME,
    host: process.env.SQL_DB_HOST,
    dialect: "mysql",
  },
};
