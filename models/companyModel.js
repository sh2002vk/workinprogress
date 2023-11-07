const Sequelize = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('company', {
  CompanyID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Industry: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ContactEmail: Sequelize.STRING
}, {
  timestamps: false,
  tableName: 'COMPANY'
});

module.exports = Company;
