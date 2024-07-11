const Sequelize = require('sequelize');
const sequelize = require('../database');
const Student = require('./studentModel');
const Job = require('./jobModel');
const Recruiter = require('./recruiterModel');

const Shortlist = sequelize.define('Shortlist', {
    ShortlistID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    StudentID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Student,
            key: 'StudentID'
        }
    },
    JobID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Job,
            key: 'JobID'
        }
    },
    RecruiterID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Recruiter,
            key: 'RecruiterID'
        }
    }
}, {
    timestamps: false,
    tableName: 'SHORTLIST'
});

Student.hasMany(Shortlist, { foreignKey: 'StudentID' });
Shortlist.belongsTo(Student, { foreignKey: 'StudentID' });

Job.hasMany(Shortlist, { foreignKey: 'JobID' });
Shortlist.belongsTo(Job, { foreignKey: 'JobID' });

Recruiter.hasMany(Shortlist, { foreignKey: 'RecruiterID' });
Shortlist.belongsTo(Recruiter, { foreignKey: 'RecruiterID' });

module.exports = Shortlist;
