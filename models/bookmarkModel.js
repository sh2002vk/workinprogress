const Sequelize = require('sequelize');
const sequelize = require('../database'); // Adjust the path as needed

const Bookmark = sequelize.define('bookmarkModel', {
  BookmarkID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  JobID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'job', // 'Job' should match the name of your Job model
      key: 'JobID',
    },
    onDelete: 'CASCADE',
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'student', // 'Student' should match the name of your Student model
      key: 'StudentID',
    },
    onDelete: 'CASCADE',
  },
  Direction: {
    type: Sequelize.ENUM('RECRUITER', 'STUDENT'),
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'BOOKMARK',
});


module.exports = Bookmark;
