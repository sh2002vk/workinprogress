const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Company extends Model {
  static associate(models) {
    // Define associations here
    Company.hasMany(models.Recruiter, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
    Company.hasMany(models.Job, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
  }
}

Company.init({
  CompanyID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Industry: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ContactEmail: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Company',
  tableName: 'company',
  timestamps: false
});

module.exports = Company;
