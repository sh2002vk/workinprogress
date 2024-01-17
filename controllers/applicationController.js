// Import required models
const Application = require('../models/applicationModel');

exports.createApplication = async (req, res) => {
    // Logic to create a new application
    try {
        const {JobID, StudentID, RecruiterID, ApplicationTime, Status} = req.body;
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

exports.applyToApplication = (req, res) => {
    // Logic for a student to apply to an application
};

exports.getApplicants = (req, res) => {
    // Logic to get applicants for an application
};

exports.deleteApplication = async (req, res) => {
    // Logic to delete an application
    try {
        const deleteID = req.params.jobID;

        const deleted = await Application.destroy({
            where: {id: deleteID}
        });

        if (deleted) {
            res.status(200).send({message: "Successfully deleted application"})
        } else {
            res.status(404).send({message: "Application not found"})
        }
    } catch (error) {
        res.status(400).send({message: "Error deleting recruiter", error: error.message});
    }
};
