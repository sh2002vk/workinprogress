const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const recruiterController = require('../controllers/recruiterController');
const companyController = require('../controllers/companyController');
// const applicationController = require("../controllers/applicationController");
// const jobController = require("../controllers/jobController");

// student
router.get('/student/getRecruiterContact', studentController.requestContact);
router.get('/student/getJobs', studentController.getJobsFiltered);
// router.get('/student/getInterestedJobs', studentController.getsInterest);
router.post('/student/bookmarkJob', studentController.createBookmark);
router.delete('/student/unbookmarkJob', studentController.deleteBookmark);
router.post('/student/createApplication', studentController.createApplication);
router.put('/student/updateApplication', studentController.updateApplication);
router.get('/student/checkEligibility', studentController.checkRequiredDocuments);
// router.post('/student/submitApplication', studentController.submitApplication); // TODO: Implement and disucss with team. is needed
router.delete('/student/deleteApplication', studentController.deleteApplication);
router.get('/student/getApplications', studentController.getApplications);


// recruiter
router.post('/recruiter/getStudents', recruiterController.getStudentsFiltered);
router.get('/recruiter/getShortlistedStudents', recruiterController.getShortlistedStudents); 
// router.get('/recruiter/getApplicants', recruiterController.getApplicants)
router.post('/recruiter/bookmarkStudent', recruiterController.addStudentToBookMark); 
router.post('/recruiter/shortlistStudent', recruiterController.shortlistStudent); 
router.get('/recruiter/getStudentsThatApplied', recruiterController.getStudentsThatApplied);
router.get('/recruiter/getJobPostings', recruiterController.getJobPostings); 
router.post('/recruiter/createJobPosting', recruiterController.createJob);
router.put('/recruiter/updateJobPosting', recruiterController.updateJob);
// router.post('/recruiter/publishJobPosting', recruiterController.publishPosting); TODO: implement and disucess with team
router.delete('/recruiter/deleteJobPosting', recruiterController.deleteJob);

// company
router.get('/company/getRecruiters', companyController.getRecruiters);

// job
// router.get('/job/getJob', jobController.getJob);

// application
// router.get('/application/getApplication', applicationController.getApplication);

module.exports = router;