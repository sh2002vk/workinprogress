const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Interest extends Model {
  static associate(models) {
    // Define associations here
    Interest.belongsTo(models.Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
    Interest.belongsTo(models.Student, { foreignKey: 'StudentID', onDelete: 'CASCADE' });
  }
}

Interest.init({
  JobID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Job',
      key: 'JobID',
    },
    onDelete: 'CASCADE',
  },
  StudentID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'StudentID',
    },
    onDelete: 'CASCADE',
  },
  Direction: {
    type: DataTypes.ENUM('RECRUITER', 'STUDENT', 'MUTUAL'),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Interest',
  tableName: 'interest',
  timestamps: false
});

module.exports = Interest;
