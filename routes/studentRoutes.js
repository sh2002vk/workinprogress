const express = require('express');
const studentController = require('../controllers/studentController');
// const { authenticateRecruiter } = require('../middleware/authMiddleware'); // This is a placeholder for your auth middleware
const router = express.Router();

// Route to create a new application to a job (requires jobID, studentsID, recruiterID, and STATUS
router.post('/application', studentController.createApplication);

// Route to delete an application
router.delete('/application/:applicationID', studentController.deleteApplication);

// Route to get applications of a studentID
router.get('/application/:studentID', studentController.getApplications);

// Route to request recruiters contact
router.get('/requestContact/:studentID/:jobID', studentController.requestContact);

// Route to bookmark a job posting
router.post('/bookmark/:studentID/:jobID', studentController.createBookmark);

// Route to remove a bookmarked job posting
router.delete('/bookmark/:studentID/:jobID', studentController.deleteBookmark);

// Export the router to be mounted by the main application
module.exports = router;