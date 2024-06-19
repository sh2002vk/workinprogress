const Job = require('../models/jobModel');
const Application = require("../models/applicationModel");
const Bookmark = require("../models/bookmarkModel");

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

exports.addStudentToBookMark = async (req, res) => {
    try {
        const {
            recruiterID,
            jobID,
            studentID
        } = req.body;

        let whereClause = {};

        if (recruiterID) {
            whereClause.recruiterID = recruiterID;
        } 
        if (jobID) {
            whereClause.jobID = jobID;
        }
        if (studentID) {
            whereClause.studentID = studentID;
        }

        const newBookmark = await Bookmark.create({
            recruiterID,
            jobID,
            studentID
        });
        res.status(201).send(newBookmark);
    } catch (error) {
        res.status(400).send({message: "Unable to bookmark student", error: error.message});
    }
}

exports.getStudentsFiltered = async (req, res) => {
    try {
        const { 
            preference, // work style
            duration, // length of term
            season, // f24, w25, s25, etc
            level // used as 1-4 for ug, 5 master, 6 phd
        } = req.body;


        let whereClause = {};

        if (preference) {
            whereClause.Preference = preference;
        }
        if (duration) {
            whereClause.Duration = duration;
        } 
        if (season) {
            whereClause.Season = season;
        }
        if (level) {
            whereClause.AcademicYear = parseInt(level);
        }

        console.log(whereClause);

        let students = await Student.findAll({
            where: whereClause,
            attributes: ['StudentID', 'FirstName', 'LastName', 'School', 'WorkExperience']
        });

        res.status(200).send({ message: "Filtered students are listed", data: students });
    } catch (error) {
        res.status(400).send({ message: "Error filtering students", error: error.message });
    }
}
