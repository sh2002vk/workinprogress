const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Recruiter routes
router.post('/recruiter', accountController.createRecruiter);
router.put('/recruiter/:id', accountController.updateRecruiter);
router.delete('/recruiter/:id', accountController.deleteRecruiter);

// Student routes
router.post('/student', accountController.createStudent);
router.put('/student/:studentID', accountController.updateStudent);
router.delete('/student/:id', accountController.deleteStudent);

module.exports = router;
