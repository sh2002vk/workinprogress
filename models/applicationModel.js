const Sequelize = require('sequelize');
const sequelize = require('../database');

const Application = sequelize.define('applicationModel', {
  JobID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'job',
      key: 'JobID',
    },
    onDelete: 'CASCADE',
    primaryKey: true
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'student',
      key: 'StudentID',
    },
    onDelete: 'CASCADE',
    primaryKey: true
  },
  RecruiterID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'recruiter',
      key: 'RecruiterID',
    },
    onDelete: 'SET NULL',
  },
  ApplicationTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  Status: {
    type: Sequelize.ENUM('APPLIED', 'REVIEW', 'INTERVIEW', 'ACCEPT', 'REJECT'),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'APPLICATION'
});

module.exports = Application;
