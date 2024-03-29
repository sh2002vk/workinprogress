const Sequelize = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('companyModel', {
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
  ContactEmail: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'COMPANY'
});

module.exports = Company;
