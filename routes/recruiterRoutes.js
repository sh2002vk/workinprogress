const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

//Route to create a new job
router.post('/job/', recruiterController.createJob);

//Route to update a current job
router.put('/job/:jobID', recruiterController.updateJob);

//Route to add student to a bookmark for a job
router.post('/job/addBookmark', recruiterController.addStudentToBookMark);

//Route to delete a job
router.delete('/job/:jobID', recruiterController.deleteJob);

//Route to get applicants from a job
router.get('/job/:jobID', recruiterController.getApplicants);

module.exports = router;
