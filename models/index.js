const sequelize = require('../database'); // The sequelize instance
const Company = require('./companyModel');
const Job = require('./jobModel');
const Student = require('./studentModel');
const Recruiter = require('./recruiterModel');
const Application = require('./applicationModel');
const Bookmark = require('./bookmarkModel');

// A Company has many Jobs
Company.hasMany(Job, { foreignKey: 'CompanyID' });
// A Job belongs to one Company
Job.belongsTo(Company, { foreignKey: 'CompanyID' });

// A Student has many Applications
Student.hasMany(Application, { foreignKey: 'StudentID' });
// An Application belongs to one Student
Application.belongsTo(Student, { foreignKey: 'StudentID' });

// A Recruiter has many Applications
Recruiter.hasMany(Application, { foreignKey: 'RecruiterID' });
// An Application belongs to one Recruiter, but it can be null
Application.belongsTo(Recruiter, { foreignKey: 'RecruiterID', allowNull: true });

// A Job has many Applications
Job.hasMany(Application, { foreignKey: 'JobID' });
// An Application belongs to one Job
Application.belongsTo(Job, { foreignKey: 'JobID' });

Bookmark.belongsTo(Job, { foreignKey: 'JobID', onDelete: 'CASCADE' });
Bookmark.belongsTo(Recruiter, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });
Bookmark.belongsTo(Student, { foreignKey: 'StudentID', onDelete: 'CASCADE' });

Job.hasMany(Bookmark, { foreignKey: 'JobID', onDelete: 'CASCADE' });
Recruiter.hasMany(Bookmark, { foreignKey: 'RecruiterID', onDelete: 'CASCADE' });

// Sync all models with the database
sequelize.sync();

module.exports = {
  sequelize,
  Company,
  Job,
  Student,
  Recruiter,
  Application,
  Bookmark
};

