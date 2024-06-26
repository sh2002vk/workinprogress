const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const recruiterController = require('../controllers/recruiterController');
const companyController = require('../controllers/companyController');
const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');

// student
router.get('/student/getFullProfile', studentController.getFullProfile); 
router.get('/student/getShortProfile', studentController.getShortProfile); 

// recruiter
router.get('/recruiter/getFullProfile', recruiterController.getFullProfile); 

// company
router.get('/company/getFullProfile', companyController.getFullProfile);

// Getters
router.get('/job/getJob', jobController.getJob);

router.get('/application/getApplication', applicationController.getApplication);

module.exports = router;