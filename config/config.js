require("dotenv").config();

const { Sequelize } = require('sequelize')
const { DB_NAME, USERNAME, PASS, HOST } = process.env


const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports =  new Sequelize(HOST, {
  host: HOST,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: HOST,
//   dialect: 'mysql',
// })

// testDbConnection = async () => {
//   try {
//     await sequelize.authenticate()
//     // sequelize.sync({ force: true })
//   } catch (error) {
//     console.error(error)
//   }
// }

// module.exports = { sq: sequelize, testDbConnection }

// // module.exports = {
// //     HOST: process.env.HOST,
// //     USER: process.env.USERNAME,
// //     PASSWORD: process.env.PASS,
// //     DB: process.env.DB_NAME
// //   };



