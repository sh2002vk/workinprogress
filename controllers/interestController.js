// Import required models
const Application = require('../models/applicationModel');
const Shortlist = require('../models/shortlistModel');
const Bookmark = require('../models/bookmarkModel');
const Job = require('../models/jobModel');
const {Sequelize} = require("sequelize");
const Student = require('../models/studentModel');
const Recruiter = require("../models/recruiterModel");
const { Op, where } = require('sequelize');
const Company = require("../models/companyModel");
const Interest = require("../models/interestModel");

exports.checkIfApplied = async (req, res) => {
    try {
        const { studentID, jobID } = req.query;

        console.log(req.query);

        const interest = await Interest.findOne({
            where: {
                StudentID: studentID,
                JobID: jobID,
                Direction: "STUDENT"
            }
        });

        if (!interest) {
            return res.status(404).send({ message: "Student has not applied to this job", isApplied: false});
        }

        res.status(200).send({ message: "Student has applied to this job" , isApplied: true});
    } catch (error) {
        res.status(400).send({ message: "Error checking application status", error: error.message, isApplied: false });
    }
};