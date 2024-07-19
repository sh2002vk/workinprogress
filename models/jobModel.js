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
  RecruiterID: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'recruiter',
      key: 'RecruiterID',
    },
    onDelete: 'CASCADE',
  },
  Type: {
    type: Sequelize.ENUM('Internship', 'Contract', 'Other')
  },
  Role: {
    type: Sequelize.STRING
  },
  Location: {
    type: Sequelize.STRING
  },
  DatePosted: {
    type: Sequelize.DATE,
    allowNull: false
  },
  DateClosed: {
    type: Sequelize.DATE
  },
  Experience: {
    type: Sequelize.FLOAT
  },
  Pay: Sequelize.FLOAT,
  Environment: {
    type: Sequelize.ENUM('INPERSON', 'REMOTE', 'HYBRID')
  },
  Duration: {
    type: Sequelize.ENUM('4', '8', '12')
  },
  Terms: {
    type: Sequelize.JSON
  },
  Industry: {
    type: Sequelize.STRING
  },
  JobDescription: {
    type: Sequelize.TEXT
  },
  JobQualification: {
    type: Sequelize.TEXT
  },
  Status: {
    type: Sequelize.ENUM('DRAFT', 'COMPLETED', 'CLOSED'),
    allowNull: false
  },
  RequiredDocuments: {
    type: Sequelize.JSON,
    allowNull: true
  },
  Season: {
    type: Sequelize.ENUM('F24', 'W25', 'S25', 'F25'),
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'JOB'
});

Job.associate = (models) => {
  Job.belongsTo(models.Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
  Job.belongsTo(models.Recruiter, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
  Job.hasMany(models.Application, { foreignKey: 'JobID', onDelete: 'CASCADE' });
};

module.exports = Job;
