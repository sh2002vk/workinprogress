const Sequelize = require('sequelize');
const sequelize = require('../database');

const Application = sequelize.define('Application', {
  ApplicationID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  JobID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Job',
      key: 'JobID',
    },
    onDelete: 'CASCADE'
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'StudentID',
    },
    onDelete: 'CASCADE'
  },
  RecruiterID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Recruiter',
      key: 'RecruiterID',
    },
    onDelete: 'CASCADE'
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

Application.associate = (models) => {
  Application.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
  Application.belongsTo(models.Student, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
  Application.belongsTo(models.Recruiter, { foreignKey: 'RecruiterID', onDelete: 'SET NULL' });
};

module.exports = Application;
