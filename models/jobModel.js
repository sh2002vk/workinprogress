const Sequelize = require('sequelize');
const sequelize = require('../database');

const Job = sequelize.define('jobModel', {
  JobID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CompanyID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'company', // This is a reference to another model
      key: 'CompanyID', // This is the column name of the referenced model
    },
    onDelete: 'CASCADE'
  },
  Role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Experience: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  Pay: Sequelize.FLOAT
}, {
  timestamps: false,
  tableName: 'JOB'
});

module.exports = Job;
