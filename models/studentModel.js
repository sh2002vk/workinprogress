const Sequelize = require('sequelize');
const sequelize = require('../database');

const Student = sequelize.define('studentModel', {
  StudentID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  School: {
    type: Sequelize.STRING,
    allowNull: false
  },
  EmailID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  AcademicYear: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Age: Sequelize.INTEGER,
  ResumeLink: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  AcademicMajor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  GPA: Sequelize.DECIMAL(3, 2),
  WorkExperience: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  PersonalStatement: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  Experience: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'STUDENT'
});

module.exports = Student;
