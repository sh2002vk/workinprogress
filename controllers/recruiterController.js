const Job = require('../models/jobModel');
const Application = require("../models/applicationModel");
const Bookmark = require("../models/bookmarkModel");
const Recruiter = require('../models/recruiterModel');
const Shortlist = require('../models/shortlistModel')

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
        const {jobID, updatedData} = req.body;

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
        const {deleteID} = req.body;

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
        const {jobID} = req.body;

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
            JobID: jobID,
            StudentID: studentID,
            Direction: "RECRUITER"
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

// Get the full profile of a recruiter
exports.getFullProfile = async (req, res) => {
    try {
        const { recruiterID } = req.body;

        const recruiter = await Recruiter.findByPk(recruiterID);

        if (recruiter) {
            res.status(200).send({ message: "Full recruiter profile", data: recruiter });
        } else {
            res.status(404).send({ message: "Recruiter not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error getting recruiter profile", error: error.message });
    }
};

exports.shortlistStudent = async (req, res) => {
    try {
        const { StudentID, JobID, RecruiterID } = req.body;

        const newShortlist = await Shortlist.create({
            StudentID,
            JobID,
            RecruiterID
        });

        res.status(201).send({ message: "Student successfully shortlisted", data: newShortlist });
    } catch (error) {
        res.status(400).send({ message: "Error shortlisting student", error: error.message });
    }
};

exports.getShortlistedStudents = async (req, res) => {
    try {
        const { recruiterID } = req.body;

        const shortlisted = await Shortlist.findAll({
            where: { RecruiterID: recruiterID },
            include: [
                {
                    model: Student,
                    attributes: ['StudentID', 'FirstName', 'LastName', 'School', 'AcademicMajor']
                },
                {
                    model: Job,
                    attributes: ['JobID', 'Role', 'Location']
                }
            ]
        });

        res.status(200).send({ message: "Shortlisted students", data: shortlisted });
    } catch (error) {
        res.status(400).send({ message: "Error getting shortlisted students", error: error.message });
    }
};

exports.getStudentsThatApplied = async (req, res) => {
    try {
        const { jobID } = req.body;

        const applications = await Application.findAll({
            where: { JobID: jobID },
            include: [
                {
                    model: Student,
                    attributes: ['StudentID', 'FirstName', 'LastName', 'School', 'AcademicMajor', 'GPA']
                }
            ]
        });

        if (applications.length === 0) {
            return res.status(404).send({ message: "No applications found for this job" });
        }

        const students = applications.map(application => application.Student);

        res.status(200).send({ message: "Students that applied to the job", data: students });
    } catch (error) {
        res.status(400).send({ message: "Error getting students that applied", error: error.message });
    }
};

exports.getJobPostings = async (req, res) => {
    try {
        const { recruiterID } = req.body;

        const jobPostings = await Job.findAll({
            where: { RecruiterID: recruiterID },
            attributes: ['JobID', 'Role', 'Location', 'Experience', 'Pay', 'Environment', 'Duration', 'StartTime', 'EndTime', 'Industry']
        });

        if (jobPostings.length === 0) {
            return res.status(404).send({ message: "No job postings found for this recruiter" });
        }

        res.status(200).send({ message: "Job postings for the recruiter", data: jobPostings });
    } catch (error) {
        res.status(400).send({ message: "Error getting job postings", error: error.message });
    }
};