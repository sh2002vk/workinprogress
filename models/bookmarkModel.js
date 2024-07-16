const Sequelize = require('sequelize');
const sequelize = require('../database');
const { Student, Recruiter, Job } = require("./index"); // Adjust the path as needed

const Bookmark = sequelize.define('Bookmark', {
  JobID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Job, // 'Job' should match the name of your Job model
      key: 'JobID',
    },
    onDelete: 'CASCADE',
    primaryKey: false,
  },
  StudentID: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Student, // 'Student' should match the name of your Student model
      key: 'StudentID',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  RecruiterID: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Recruiter, // 'Recruiter' should match the name of your Recruiter model
      key: 'RecruiterID',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  Direction: {
    type: Sequelize.ENUM('RECRUITER', 'STUDENT'),
    allowNull: false,
    primaryKey: true,
  }
}, {
  timestamps: false,
  tableName: 'BOOKMARK',
});

module.exports = Bookmark;