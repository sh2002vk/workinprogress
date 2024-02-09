const Job = require('../models/jobModel');
const Application = require("../models/applicationModel");

exports.createJob = async (req, res) => {
    //Logic to create a job
    try {
        const {CompanyID, Role, Location, Experience, Pay} = req.body;
        const newJob = await Job.create({
            CompanyID,
            Role,
            Location,
            Experience,
            Pay
        });
        res.status(201).send(newJob);
    } catch (error) {
        res.status(400).send({message: "Error creating job", error: error.message});
    }
}

exports.updateJob = async (req, res) => {
    try {
        const jobID = req.params.jobID;
        const updatedData = req.body;

        const [updated] = await Job.update(updatedData, {
            where: {JobID: jobID}
        });

        if (updated) {
            const updatedJob = await Job.findByPk(jobID);
            res.status(201).send(updatedJob);
        } else {
            res.status(404).send("Job not found")
        }
    } catch (error) {
        res.status(400).send({message:"Error updated job", error: error.message});
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const deleteID = req.params.jobID;
        const deleted = await Job.destroy({
            where: {JobID: deleteID}
        });

        if (deleted) {
            res.status(200).send("Successfully deleted job")
        } else {
            res.status(404).send("Job not found");
        }
    } catch (error) {
        res.status(400).send("Error deleting job");
    }
}

exports.getApplicants = async (req, res) => {
    //Logic to get applicants of a job
    try {
        const jobID = req.params.jobID;
        const students = [];
        const applications = await Application.findAll({
            where: {JobID: jobID}
        })
        for (let i of applications) {
            students.push(i.get('StudentID'));
        }
        res.json(students);
    } catch (error) {
        res.status(400).send({message: "Error fetching applicants", error: error.message});
    }
}
