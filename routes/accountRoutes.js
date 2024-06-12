const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Recruiter routes
router.post('/recruiter', accountController.createRecruiter);
router.put('/recruiter/:recruiterID', accountController.updateRecruiter);
router.delete('/recruiter/:recruiterID', accountController.deleteRecruiter);
router.get('/recruiter/:companyID', accountController.getRecruiters);

// Student routes
router.post('/student/createStudent', accountController.createStudent);
router.put('/student/:studentID', accountController.updateStudent);
router.delete('/student/:studentID', accountController.deleteStudent);
router.post('/student/getStudents', accountController.getStudentsFiltered);

// Job routes
router.post('/job/getJobs', accountController.getJobsFiltered);

// Company routes
router.post('/company', accountController.createCompany);
router.delete('/company/:companyID', accountController.deleteCompany);

// Getters
router.get('/student/quota/:studentID', accountController.getQuota);
router.get('/student/:studentID', accountController.getStudent);
module.exports = router;
