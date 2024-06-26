const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const recruiterController = require('../controllers/recruiterController');
const companyController = require('../controllers/companyController');

// student
router.get('/student/getFullProfile', studentController.getFullProfile); 
router.get('/student/getShortProfile', studentController.getShortProfile); 

// recruiter
router.get('/recruiter/getFullProfile', recruiterController.getFullProfile); 

// company
router.get('/company/getFullProfile', companyController.getFullProfile);

module.exports = router;