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
  AcademicYear: {             // enforced 1-6
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6,
      isInt: true,
    }
  },
  Age: Sequelize.INTEGER,
  ResumeLink: {
    type: Sequelize.TEXT,
    allowNull: true
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
  },
  Quota: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Preference: {
    type: Sequelize.ENUM('HYBRID', 'REMOTE', 'INPERSON'),
    allowNull: true
  },
  Duration: {
    type: Sequelize.ENUM('4', '8', '12'),
    allowNull: true
  },
  Season: {
    type: Sequelize.ENUM('F24', 'W25', 'S25', 'F25'),
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'STUDENT'
});

Student.associate = (models) => {
  Student.hasMany(models.Application, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
};

module.exports = Student;
