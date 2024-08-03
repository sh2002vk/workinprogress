const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Verification extends Model {}

Verification.init({
  EmailID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  Code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Verification',
  tableName: 'verification',
  timestamps: false
});

module.exports = Verification;
