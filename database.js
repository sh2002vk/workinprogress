delete require.cache[require.resolve('dotenv/config')];
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('wipTest', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
