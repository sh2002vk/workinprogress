const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const recruiterController = require('../controllers/recrutierController');
const companyController = require('../controllers/companyController');

// student
router.get('/student/getRecruiterContact', studentController.requestContact);
router.get('/student/getJobs', studentController.getJobsFiltered);
router.get('/student/getInterestedJobs', studentController.getInterest);
router.post('/student/bookmarkJob', studentController.createBookmark);
router.delete('/student/unbookmarkJob', studentController.deleteBookmark);
router.post('/student/createApplication', studentController.createApplication);
router.put('/student/updateApplication', studentController.updateApplication);
router.get('/student/checkEligibility', studentController.checkRequiredDocuments);
// router.post('student/submitApplication', studentController.submitApplication); // TODO: Implement and disucss with team
router.delete('/student/deleteApplication', studentController.deleteApplication);
router.get('student/getApplications', studentController.getApplications);


// recruiter
router.get('/recruiter/getStudents', recruiterController.getStudentsFiltered);
router.get('/recruiter/getShortlistedStudents', recruiterController.getShortlistedStudents); // TODO: implement
router.get('/recruiter/getApplicants', recruiterController.getApplicants)
router.post('/recruiter/bookmarkStudent', recruiterController.addStudentToBookMark); 
router.post('/recruiter/shortlistStudent', router.shortlistStudent); // TODO: implement
router.get('/recruiter/getStudentsThatApplied', recruiterController.getStudentsApplied); // TODO: implement
router.get('/recruiter/getJobPostings', recruiterController.getJobPostings); // TODO: implement
router.post('/recruiter/createJobPosting', recruiterController.createJob);
router.put('/recruiter/updateJobPosting', recruiterController.updateJob);
// router.post('/recruiter/publishJobPosting', recruiterController.publishPosting); TODO: implement and disucess with team
router.delete('/recruiter/deleteJobPosting', recruiterController.deleteJob);

// company
router.post('/company/onboardRecruiter', companyController.onboardRecruiter); // TODO: implement
router.delete('/company/offboardRecruiter', companyController.offboardRecruiter); // TODO: implement
router.get('/company/getRecruiters', companyController.getRecruiters);

module.exports = router;