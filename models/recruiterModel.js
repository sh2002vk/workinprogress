const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Recruiter extends Model {
  static associate(models) {
    // Define associations here
    Recruiter.belongsTo(models.Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
    Recruiter.hasMany(models.Job, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
    Recruiter.hasMany(models.Application, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
  }
}

Recruiter.init({
  RecruiterID: {
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
  CompanyID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Company', // Use the model name as defined in Sequelize
      key: 'CompanyID',
    },
    onDelete: 'CASCADE'
  },
  EmailID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  CompanyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Roles: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Locations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  LinkedInProfile: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Recruiter',
  tableName: 'recruiter',
  timestamps: false
});

module.exports = Recruiter;
