

// Import required models
const Application = require('../models/applicationModel');
const Shortlist = require('../models/shortlistModel');
const Bookmark = require('../models/bookmarkModel');
const Job = require('../models/jobModel');
const {Sequelize} = require("sequelize");
const Student = require('../models/studentModel');
const Recruiter = require("../models/recruiterModel");

exports.createApplication = async (req, res) => {
    // Logic to apply to a job
    try {
        const {
            JobID,
            StudentID,
            RecruiterID,
            ApplicationTime,
            Status,
            SubmittedDocuments
        } = req.body;
        const newApplication = await Application.create({
            JobID,
            StudentID,
            RecruiterID,
            ApplicationTime,
            Status,
            SubmittedDocuments
        });

        res.status(201).send({
            message: "Application successfully created",
            data: newApplication
        });
    } catch (error) {
        res.status(400).send({message: "Error creating application", error: error.message});
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const {ApplicationID, updatedData} = req.body;

        const [updated] = await Application.update(updatedData, {
            where: { ApplicationID: ApplicationID }
        });

        if (updated) {
            const updatedApplication = await Application.findByPk(ApplicationID);
            res.status(200).send(updatedApplication);
        } else {
            res.status(404).send({ message: "Application not found or nothing updated" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error updating application", error: error.message });
    }
}

exports.deleteApplication = async (req, res) => {
    // Logic to delete a current job application
    try {
        const {deleteID} = req.body;

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

exports.getApplications = async (req, res) => {
    try {

        const {StudentID} = req.body;

        const applications = await Application.findAll({
            where: {
                StudentID: StudentID,
            },
            attributes: ['ApplicationID']
        });

        const student = await Student.findByPk(StudentID);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        } else {
            res.status(200).send({
                message: "Applications listed below:",
                data: applications
            })
        }

    } catch (error) {
        res.status(400).send({
            message: "Error in getting applications",
            error: error.message
        })
    }
}

exports.checkRequiredDocuments = async (req, res) => {
    try {
        const {JobID, ApplicationID} = req.body;

        const job = await Job.findByPk(JobID);
        const application = await Application.findByPk(ApplicationID);
        const requiredDocuments = job.RequiredDocuments;

        Object.keys(requiredDocuments).forEach(key => {
            if (requiredDocuments[key]) {
                switch (key) {
                    case "Resume":
                        if (!application.SubmittedDocuments.Resume) {
                            console.log("resume not found")
                            return res.status(200).send(false);
                        }
                        break;
                    case "CoverLetter":
                        if (!application.SubmittedDocuments.CoverLetter) {
                            return res.status(200).send(false);
                        }
                        break;
                    case "EnglishSample":
                        if (!application.SubmittedDocuments.EnglishSample) {
                            return res.status(200).send(false);
                        }
                        break;
                }
            }
        })
        return res.status(200).send(true);

    } catch (error) {
        res.status(400).send({
            message: "Error in checking eligibility",
            error: error.message
        })
    }
}

exports.requestContact = async (req, res) => {
    try {
        const {StudentID, RecruiterID} = req.body;

        const shortlist = await Shortlist.findOne({
            where: {
                StudentID: StudentID,
                RecruiterID: RecruiterID,
            }
        });

        if (shortlist) {
            res.status(200).send({
                message: `${RecruiterID} is interested in ${StudentID}`,
                result: true}
            );
        } else {
            res.status(404).send({
                message: `${RecruiterID} is NOT interested in ${StudentID}`,
                result: false}
            )
        }

    } catch (error) {
        res.status(400).send({message: "Error requesting contact", error: error.message});
    }
};

exports.createBookmark = async (req, res) => {
    try {
        const {StudentID, JobID} = req.body;

        const bookmark = await Bookmark.create({
            JobID: JobID,
            StudentID: StudentID,
            Direction: 'STUDENT'
        });

        if (bookmark) {
            res.status(201).send({
                message: "Bookmark successfully created",
                data: bookmark
            })
        } else {
            res.status(400).send("Bookmark not created")
        }
    } catch (error) {
        res.status(400).send({message: "Error bookmarking job", error: error.message})
    }
}

exports.deleteBookmark = async (req, res) => {
    try {
        const {StudentID, JobID} = req.body;

        const bookmark = await Bookmark.destroy({
            where: {
                StudentID: StudentID,
                JobID: JobID,
                Direction: "STUDENT"
            }
        });

        if (!bookmark) {
            res.status(404).send({
                message: "Bookmark not found"
            });
        } else {
            res.status(200).send({
                message: "Successfully removed bookmark"
            })
        }
    } catch (error) {
        res.status(400).send({
            message: "Error when removing bookmark",
            error: error.message
        })
    }
}

exports.getInterest = async (req, res) => {
    try {
        const {student} = req.body;

        const interest = await Interest.findAll({
            where: {
                StudentID: student,
                [Sequelize.Op.or]: [
                    { Direction: "STUDENT" },
                    { Direction: "MUTUAL" }
                ]
            },
            attributes: {
                JobID: ["JobID"]
            }
        })

        if(!student) {
            res.status(404).send("Error not found")
        } else {
            res.status(200).send({
                message: "Interested Jobs:",
                data: interest
            })
        }
    } catch (error) {
        res.status(400).send({message: "Error", error: error.message})
    }
}

exports.getJobsFiltered = async (req, res) => {
    try {
        const {
            role, // title
            environment, //work style
            location,
            duration, // length of term
            startAvailability, // f24, w25, s25, etc
            endAvailability, // f24, w25, s25, etc
            industry
        } = req.body;

        let whereClause = {};

        if (role) {
            whereClause.Role = role;
        }
        if (environment) {
            whereClause.Environment = environment;
        }
        if (location) {
            whereClause.Location = location;
        }
        if (duration) {
            whereClause.Duration = duration;
        }
        if (startAvailability) {
            whereClause.StartTime = startAvailability;
        }
        if (endAvailability) {
            whereClause.EndTime = endAvailability;
        }
        if (industry) {
            whereClause.Industry = industry;
        }

        console.log(whereClause);

        let jobs = await Job.findAll({
            where: whereClause,
            attributes: ['JobID']
        });

        res.status(200).send({ message: "Filtered jobs are listed", data: jobs });
    } catch (error) {
        res.status(400).send({ message: "Error filtering jobs", error: error.message });
    }
}

exports.getFullProfile = async (req, res) => {
    try {
        const { studentID } = req.body;

        const student = await Student.findByPk(studentID);

        if (student) {
            res.status(200).send({ message: "Full student profile", data: student });
        } else {
            res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error getting student profile", error: error.message });
    }
};

exports.getShortProfile = async (req, res) => {
    try {
        const { studentID } = req.body;

        const student = await Student.findByPk(studentID, {
            attributes: ['StudentID', 'FirstName', 'LastName', 'School', 'AcademicMajor', 'GPA']
        });

        if (student) {
            res.status(200).send({ message: "Short student profile", data: student });
        } else {
            res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error getting student profile", error: error.message });
    }
};