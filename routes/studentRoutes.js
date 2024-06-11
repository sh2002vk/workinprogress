const express = require('express');
const studentController = require('../controllers/studentController');
// const { authenticateRecruiter } = require('../middleware/authMiddleware'); // This is a placeholder for your auth middleware
const router = express.Router();

// Route to create a new application to a job (requires jobID, studentsID, recruiterID, and STATUS
router.post('/application/:jobID/:studentID/:recruiterID/:status', studentController.createApplication);

// Route to delete an application
router.delete('/application/:applicationID', studentController.deleteApplication);

// Route to request recruiters contact
router.get('/requestContact/:studentID/:jobID', studentController.requestContact);

// Export the router to be mounted by the main application
module.exports = router;