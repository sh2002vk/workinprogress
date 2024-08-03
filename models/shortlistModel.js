const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Shortlist extends Model {
  static associate(models) {
    // Define associations here
    Shortlist.belongsTo(models.Student, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
    Shortlist.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
    Shortlist.belongsTo(models.Recruiter, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
  }
}

Shortlist.init({
  ShortlistID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  StudentID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Student', // Use the model name as defined in Sequelize
      key: 'StudentID'
    },
    onDelete: 'CASCADE'
  },
  JobID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Job', // Use the model name as defined in Sequelize
      key: 'JobID'
    },
    onDelete: 'CASCADE'
  },
  RecruiterID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Recruiter', // Use the model name as defined in Sequelize
      key: 'RecruiterID'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Shortlist',
  tableName: 'shortlist',
  timestamps: false
});

module.exports = Shortlist;
