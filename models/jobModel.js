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
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'recruiter',
      key: 'RecruiterID',
    },
    onDelete: 'CASCADE',
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
  Pay: Sequelize.FLOAT,
  Environment: {
    type: Sequelize.ENUM('REMOTE', 'INPERSON', 'HYBRID'),
    allowNull: false
  },
  Duration: {
    type: Sequelize.ENUM('4', '8', '12')
  },
  StartTime: {
    type: Sequelize.ENUM('F24', 'W25', 'S25', 'F25')
  },
  EndTime: {
    type: Sequelize.ENUM('F24', 'W25', 'S25', 'F25')
  },
  Industry: {
    type: Sequelize.ENUM('Technology', 'Business')
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
