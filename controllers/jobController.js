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