const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Job extends Model {
  static associate(models) {
    // Define associations here
    Job.belongsTo(models.Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
    Job.belongsTo(models.Recruiter, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
    Job.hasMany(models.Application, { foreignKey: 'JobID', onDelete: 'CASCADE' });
  }
}

Job.init({
  JobID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CompanyID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Company', // Use the model name as defined in Sequelize
      key: 'CompanyID', // This is the column name of the referenced model
    },
    onDelete: 'CASCADE'
  },
  RecruiterID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Recruiter',
      key: 'RecruiterID',
    },
    onDelete: 'CASCADE',
  },
  Type: {
    type: DataTypes.ENUM('Internship', 'Contract', 'Other')
  },
  Role: {
    type: DataTypes.STRING
  },
  Location: {
    type: DataTypes.STRING
  },
  DatePosted: {
    type: DataTypes.DATE,
    allowNull: false
  },
  DateClosed: {
    type: DataTypes.DATE
  },
  Experience: {
    type: DataTypes.FLOAT
  },
  Pay: DataTypes.FLOAT,
  Environment: {
    type: DataTypes.ENUM('INPERSON', 'REMOTE', 'HYBRID')
  },
  Duration: {
    type: DataTypes.ENUM('4', '8', '12')
  },
  Terms: {
    type: DataTypes.JSONB
  },
  Industry: {
    type: DataTypes.STRING
  },
  JobDescription: {
    type: DataTypes.TEXT
  },
  JobQualification: {
    type: DataTypes.TEXT
  },
  Status: {
    type: DataTypes.ENUM('DRAFT', 'COMPLETED', 'CLOSED'),
    allowNull: false
  },
  RequiredDocuments: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  Season: {
    type: DataTypes.ENUM('F24', 'W25', 'S25', 'F25'),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Job',
  tableName: 'job',
  timestamps: false
});

module.exports = Job;
