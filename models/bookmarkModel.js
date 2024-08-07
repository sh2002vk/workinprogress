const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Bookmark extends Model {
  static associate(models) {
    // Define associations here
    Bookmark.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
    Bookmark.belongsTo(models.Student, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
    Bookmark.belongsTo(models.Recruiter, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
  }
}

Bookmark.init({
  JobID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Job', // Use the model name as defined in Sequelize
      key: 'JobID',
    },
    onDelete: 'CASCADE',
    primaryKey: false,
  },
  StudentID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Student', // Use the model name as defined in Sequelize
      key: 'StudentID',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  RecruiterID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Recruiter', // Use the model name as defined in Sequelize
      key: 'RecruiterID',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  Direction: {
    type: DataTypes.ENUM('RECRUITER', 'STUDENT'),
    allowNull: false,
    primaryKey: true,
  }
}, {
  sequelize,
  modelName: 'Bookmark',
  tableName: 'bookmark',
  timestamps: false
});

module.exports = Bookmark;
