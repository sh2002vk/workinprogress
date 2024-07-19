const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const recruiterController = require('../controllers/recruiterController');
const companyController = require('../controllers/companyController');
// const applicationController = require("../controllers/applicationController");
const jobController = require("../controllers/jobController");

// student
router.get('/student/getRecruiterContact', studentController.requestContact);
router.post('/student/getJobs', studentController.getJobsFiltered);
router.post('/student/bookmarkJob', studentController.createBookmark);
router.delete('/student/unbookmarkJob', studentController.deleteBookmark);
router.get('/student/getBookmarkedJobs', studentController.getBookmarkedJobs); 
router.post('/student/createApplication', studentController.createApplication);
router.put('/student/updateApplication', studentController.updateApplication);
router.get('/student/checkEligibility', studentController.checkRequiredDocuments);
// router.post('/student/submitApplication', studentController.submitApplication); // TODO: Implement and disucss with team. is needed
router.delete('/student/deleteApplication', studentController.deleteApplication);
router.get('/student/getApplications', studentController.getApplications);
router.get('/student/getApplicationInsights', studentController.getApplicationInsights);
router.get('/student/getCompetition', studentController.getCompetition);
// router.get('/student/getManagedApplications', studentController.getManagedApplications);


// recruiter
router.post('/recruiter/getStudents', recruiterController.getStudentsFiltered);
router.get('/recruiter/getShortlistedStudents', recruiterController.getShortlistedStudents);
router.get('/recruiter/getApplications', recruiterController.getApplications)
router.get('/recruiter/getNewApplications', recruiterController.getNewApplications);
router.get('/recruiter/getJobApplicants', recruiterController.getJobApplicants)
router.get('/recruiter/getActivePostingInformation', recruiterController.getActivePostingInformation);
router.post('/recruiter/bookmarkStudent', recruiterController.addStudentToBookMark); 
router.delete('/recruiter/unbookmarkStudent', recruiterController.removeStudentFromBookmark);
router.get('/recruiter/getBookmarkedStudents', recruiterController.getBookmarkedStudents); 
router.post('/recruiter/shortlistStudent', recruiterController.shortlistStudent); 
router.get('/recruiter/getStudentsThatApplied', recruiterController.getStudentsThatApplied);
router.get('/recruiter/getJobPostings', recruiterController.getJobPostings); 
router.post('/recruiter/createJobPosting', recruiterController.createJob);
router.put('/recruiter/updateJobPosting', recruiterController.updateJob);
// router.post('/recruiter/publishJobPosting', recruiterController.publishPosting); TODO: implement and disucess with team
router.delete('/recruiter/deleteJobPosting', recruiterController.deleteJob);
router.post('/recruiter/getGCPFiles', recruiterController.getGCPFiles);
router.post('/recruiter/getDraftStatus', recruiterController.getDraftStatus);

// company
router.get('/company/getRecruiters', companyController.getRecruiters);

// job
// router.get('/job/getJob', jobController.getJob);
router.get('/job/getJobRoles', jobController.getJobRoles);

// application
// router.get('/application/getApplication', applicationController.getApplication);

module.exports = router;