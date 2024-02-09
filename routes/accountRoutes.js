const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Recruiter routes
router.post('/recruiter', accountController.createRecruiter);
router.put('/recruiter/:recruiterID', accountController.updateRecruiter);
router.delete('/recruiter/:recruiterID', accountController.deleteRecruiter);

// Student routes
router.post('/student', accountController.createStudent);
router.put('/student/:studentID', accountController.updateStudent);
router.delete('/student/:studentID', accountController.deleteStudent);

// Company routes
router.post('/company', accountController.createCompany);
router.delete('/company/:companyID', accountController.deleteCompany);

module.exports = router;
