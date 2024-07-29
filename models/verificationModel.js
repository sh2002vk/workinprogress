const Sequelize = require('sequelize');
const sequelize = require('../database');

const Verification = sequelize.define('verificationModel', {
  EmailID: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  Code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  CreatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,
  tableName: 'VERIFICATION'
});

module.exports = Verification;
