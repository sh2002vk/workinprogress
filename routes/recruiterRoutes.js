const express = require('express');
const router = express.Router();
const accountController = require('../controllers/recruiterController');

//Route to create a new job
router.post('/job/', accountController.createJob);

//Route to update a current job
router.put('/job/:jobID', accountController.updateJob);

//Route to delete a job
router.delete('/job/:jobID', accountController.deleteJob);

//Route to get applicants from a job
router.get('/job/:jobID', accountController.getApplicants);

module.exports = router;
