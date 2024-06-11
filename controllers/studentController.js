

// Import required models
const Application = require('../models/applicationModel');
const Interest = require('../models/interestModel');

exports.createApplication = async (req, res) => {
    // Logic to apply to a job
    try {
        const {JobID, StudentID, RecruiterID, Status, ApplicationTime} = req.body;
        const newApplication = await Application.create({
            JobID,
            StudentID,
            RecruiterID,
            ApplicationTime,
            Status,
        });

        res.status(200).send("Application successfully created");
    } catch (error) {
        res.status(400).send({message: "Error creating application", error: error.message});
    }
};

exports.deleteApplication = async (req, res) => {
    // Logic to delete a current job application
    try {
        const deleteID = req.params.applicationID;

        const deleted = await Application.destroy({
            where: {ApplicationID: deleteID}
        });

        if (deleted) {
            res.status(200).send({message: "Successfully deleted application"})
        } else {
            res.status(404).send({message: "Application not found"})
        }
    } catch (error) {
        res.status(400).send({message: "Error deleting application", error: error.message});
    }
};

exports.requestContact = async (req, res) => {
    try {
        const student = req.params.studentID;
        const job = req.params.jobID;

        const interest = await Interest.findOne({
            where: {
                studentID: student,
                jobID: job
            }
        });

        if (interest) {
            res.status(200).send({
                message: `${job} is interested in ${student}`,
                result: true}
            );
        } else {
            res.status(404).send({
                message: `${job} is NOT interested in ${student}`,
                result: false}
            )
        }

    } catch (error) {
        res.status(400).send({message: "Error requesting contact", error: error.message});
    }
};