const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Student extends Model {
  static associate(models) {
    // Define associations here
    Student.hasMany(models.Application, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
  }
}

Student.init({
  StudentID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  School: {
    type: DataTypes.STRING,
    allowNull: false
  },
  EmailID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  AcademicYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6,
      isInt: true
    }
  },
  Age: DataTypes.INTEGER,
  ResumeLink: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  AcademicMajor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  GPA: DataTypes.DECIMAL(3, 2),
  WorkExperience: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  PersonalStatement: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Experience: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Quota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Preference: {
    type: DataTypes.ENUM('HYBRID', 'REMOTE', 'INPERSON'),
    allowNull: true
  },
  Interest: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  Skills: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  Duration: {
    type: DataTypes.ENUM('4', '8', '12'),
    allowNull: true
  },
  Season: {
    type: DataTypes.ENUM('F24', 'W25', 'S25', 'F25'),
    allowNull: true
  },
  Photo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  MaxQuota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  StartAvailability: {
    type: DataTypes.ENUM('F24', 'W25', 'S25', 'F25'),
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'Student',
  tableName: 'student',
  timestamps: false
});

module.exports = Student;
