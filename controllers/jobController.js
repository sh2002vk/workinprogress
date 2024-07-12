const Job = require('../models/jobModel')
const Application = require("../models/applicationModel");

exports.getJob = async (req, res) => {
    try {
        const {jobID} = req.body;

        const job = await Job.findByPk(jobID);

        if (!job) {
            res.status(404).send("No job found")
        } else {
            res.status(200).send(job)
        }
    } catch (error) {
        res.status(400).send({
            message: "Error getting job",
            error: error.message
        })
    }
}

//Get all jobs posted by the recruiter, take out the job titles, put in array and give to frontend
exports.getJobRoles = async (req, res) => {
    try {
        const {recruiterID} = req.query;

        const jobs = await Job.findAll({
            where: {
                RecruiterID: recruiterID
            },
            attributes: ['Role'] // Only select the Role attribute
        });

        // Extract the job titles into an array
        const jobTitles = jobs.map(job => job.Role);

        // Send the job titles array to the frontend
        res.status(200).send(jobTitles);
        
    } catch (error) {
        res.status(400).send({
            message: "Error getting job",
            error: error.message
        })
    }
}