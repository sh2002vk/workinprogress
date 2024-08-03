const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Application extends Model {
  static associate(models) {
    // Define associations here
    Application.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
    Application.belongsTo(models.Student, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
    Application.belongsTo(models.Recruiter, { foreignKey: 'RecruiterID', onDelete: 'SET NULL' });
  }
}

Application.init({
  ApplicationID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  JobID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Job',
      key: 'JobID',
    },
    onDelete: 'CASCADE'
  },
  StudentID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'StudentID',
    },
    onDelete: 'CASCADE'
  },
  RecruiterID: {
    type: DataTypes.STRING,
    references: {
      model: 'Recruiter',
      key: 'RecruiterID',
    },
    onDelete: 'SET NULL'
  },
  ApplicationTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Status: {
    type: DataTypes.ENUM('DRAFT', 'APPLIED', 'REVIEWED', 'INTERVIEW', 'ACCEPT', 'REJECT', 'COMPLETE'),
    allowNull: false
  },
  SubmittedDocuments: {
    type: DataTypes.JSONB,  // JSONB is recommended for PostgreSQL
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Application',
  tableName: 'application',
  timestamps: false
});

module.exports = Application;
