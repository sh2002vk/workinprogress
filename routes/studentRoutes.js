const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// Route to create a new student
router.post('/', studentController.createStudent);

// Route to update a student by ID
router.put('/:id', studentController.updateStudent);

// Route to delete a student by ID
router.delete('/:id', studentController.deleteStudent);

// Export the router to be mounted by the main application
module.exports = router;
