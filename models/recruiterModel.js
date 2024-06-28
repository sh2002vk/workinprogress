const Sequelize = require('sequelize');
const sequelize = require('../database');

const Recruiter = sequelize.define('recruiterModel', {
  RecruiterID: {
    type: Sequelize.STRING,
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
  CompanyID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'company',
      key: 'CompanyID',
    },
    onDelete: 'CASCADE'
  },
  EmailID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  CompanyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Roles: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  Locations: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'RECRUITER'
});

Recruiter.associate = (models) => {
  Recruiter.belongsTo(models.Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
  Recruiter.hasMany(models.Job, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
  Recruiter.hasMany(models.Application, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
};

module.exports = Recruiter;
