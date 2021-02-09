# Sequelize

Important Entities are Sequelize, Model, DataTypes

npm install --save sequelize
npm install --save mysql2

import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'pw', {
host: localhost || url
port: 3306,
dialect: 'mysql'
logging: false || console.log
})

try{
await sequelize.authenticate();
console.log('Connection has been established')
} catch(err) {
console.log('Unable to connect to db', err)
}

sequelize.close()

Sequelize refers to the libary while sequelize refers to an isntance of the Sequelize which represents a connection to the dtabase.

since sqlite is easy to learn with,
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

Group by Feature or Scope and in which case, have some core items and some feature specific code

all models are stored in sequelize.models

ensure that model name and the table name is same
const sequelize = new Sequelize('sqlite::memory:', {
define: {
freezeTableName: true
}
});

User.sync()
User.sync({force:true})
User.sync({alter:true})

// for production database, synchronization should be done via Migrations, with the help of Sequelize CLI
from pod in k8
all database operations (especially destructive ones) happen via sequelize-cli

there is a default createdAt and updatedAt field

Important but Advanced concepts
Transactions
important for production usage. seems easy enough
Migrations
Paranoid
does soft delete of fields and creates a deletedAt field

model.getDataValue(column_name) is the sureshot way to get the value stored in the db
model.column_name can return the value in the getter

ensurinng that hashed value is stored in db
https://sequelize.org/master/manual/getters-setters-virtuals.html

const User = sequelize.define('user', {
username: DataTypes.STRING,
password: {
type: DataTypes.STRING,
set(value) {
// Storing passwords in plaintext in the database is terrible.
// Hashing the value with an appropriate cryptographic hash function is better.
this.setDataValue('password', hash(value));
}
}
});

const User = sequelize.define('user', {
username: DataTypes.STRING,
password: {
type: DataTypes.STRING,
set(value) {
// Storing passwords in plaintext in the database is terrible.
// Hashing the value with an appropriate cryptographic hash function is better.
// Using the username as a salt is better.
this.setDataValue('password', hash(this.username + value));
}
}
});

constraints
isEmail: true

associations
one to one
one to many
many to many

# dev notes

docker is used to spin up sql and sql ui
debugging is done via VSCode
server connects to db on localhost and not on docker's internal networks
it could also be done via docker

testing needs to happen outside docker, because npm run test --watch
the --watch argument depends on it being run inside a git repository
