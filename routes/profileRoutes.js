const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const recruiterController = require('../controllers/recrutierController');
const companyController = require('../controllers/companyController');

// student
router.get('/student/getFullProfile', studentController.getFullProfile); // TO IMPLEMENT
router.get('/student/getShortProfile', studentController.getShortProfile); // TO IMPLEMENT

// recruiter
router.get('/recruiter/getFullProfile', recruiterController.getFullProfile); // TO IMPLEMENT

// company
router.get('/company/getFullProfile', companyController.getFullProfile); // TO IMPLEMENT

module.exports = router;