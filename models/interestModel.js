const Sequelize = require('sequelize');
const sequelize = require('../database');

const Interest = sequelize.define('Interest', {
    JobID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    StudentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Direction: {
        type: Sequelize.ENUM('RECRUITER', 'STUDENT', 'MUTUAL'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'INTEREST'
});

Interest.associate = (models) => {
    Interest.belongsTo(models.Job, {foreignKey: 'JobID', onDelete: 'CASCADE'});
    Interest.belongsTo(models.Student, {foreignKey: 'StudentID', onDelete: 'CASCADE'});
};

module.exports = Interest;
