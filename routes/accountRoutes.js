const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Recruiter routes
router.post('/recruiter/create', accountController.createRecruiter);
router.put('/recruiter/update', accountController.updateRecruiter);
router.delete('/recruiter/delete', accountController.deleteRecruiter);

// Student routes
router.post('/student/create', accountController.createStudent);
router.put('/student/update', accountController.updateStudent);
router.delete('/student/delete', accountController.deleteStudent);
router.get('/student/getQuota', accountController.getStudentsQuota); // need to implement

// Company routes
router.post('/company/create', accountController.createCompany);
router.put('/company/update', accountController.updateCompany); // need to implement
router.delete('/company/delete', accountController.deleteCompany);

// router.post('/student/getStudents', accountController.getStudentsFiltered);
// router.get('/recruiter/:companyID', accountController.getRecruiters);
// router.post('/job/getJobs', accountController.getJobsFiltered);
// router.get('/student/quota/:studentID', accountController.getQuota);
// router.get('/student/:studentID', accountController.getStudent);

module.exports = router;
