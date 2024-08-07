const Sequelize = require('sequelize');
const sequelize = require('../database');

// Import models
const Company = require('./companyModel');
const Job = require('./jobModel');
const Student = require('./studentModel');
const Recruiter = require('./recruiterModel');
const Application = require('./applicationModel');
const Shortlist = require('./shortlistModel');
const Bookmark = require('./bookmarkModel');
const Verification = require('./verificationModel');

// Initialize associations
Company.associate({ Job, Recruiter });
Job.associate({ Company, Application, Bookmark, Shortlist, Recruiter });
Student.associate({ Application, Bookmark, Shortlist });
Recruiter.associate({ Company, Application, Job, Bookmark, Shortlist });
Application.associate({ Job, Student, Recruiter });
Bookmark.associate({ Job, Student, Recruiter });
Shortlist.associate({ Job, Student, Recruiter });

// Export models
module.exports = {
  sequelize,
  Company,
  Job,
  Student,
  Recruiter,
  Application,
  Shortlist,
  Bookmark,
  Verification
};
