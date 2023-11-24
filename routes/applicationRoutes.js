const express = require('express');
const applicationController = require('../controllers/applicationController');
// const { authenticateRecruiter } = require('../middleware/authMiddleware'); // This is a placeholder for your auth middleware
const router = express.Router();

// Route to create a new application
router.post('/', applicationController.createApplication);

// Route for a student to apply to an application
router.post('/:applicationID/apply', applicationController.applyToApplication);

// Route to get applicants for an application
router.get('/:applicationID/applicants', applicationController.getApplicants);

// Route to delete an application
router.delete('/:applicationID', applicationController.deleteApplication);

// Export the router to be mounted by the main application
module.exports = router;
