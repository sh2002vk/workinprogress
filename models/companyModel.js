const Sequelize = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('companyModel', {
  CompanyID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Industry: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ContactEmail: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'COMPANY'
});

Company.associate = (models) => {
  Company.hasMany(models.Recruiter, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
  Company.hasMany(models.Job, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
};

module.exports = Company;
