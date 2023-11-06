const express = require('express');
const recruiterController = require('../controllers/recruiterController');
const router = express.Router();

// Route to create a new recruiter
router.post('/', recruiterController.createRecruiter);

// Route to update a recruiter by ID
router.put('/:id', recruiterController.updateRecruiter);

// Route to delete a rectuiter by ID
router.delete('/:id', recruiterController.deleteRecruiter);

// Export the router to be mounted by the main application
module.exports = router;
