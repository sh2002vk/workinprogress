

// Import required models
const Application = require('../models/applicationModel');
const Interest = require('../models/interestModel');
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
            Status,
            ApplicationTime
        } = req.body;
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

exports.updateApplication = async (req, res) => {
    try {
        const {application, updatedData} = req.body;

        const [updated] = await Application.update(updatedData, {
            where: { ApplicationID: application }
        });

        if (updated) {
            const updatedApplication = await Application.findByPk(application);
            res.status(200).send({message: "Application successfully updated", data: updatedApplication});
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
        const {studentID} = req.body;

        const applications = await Application.findAll({
            where: {
                StudentID: studentID,
            },
            attributes: ['ApplicationID']
        });

        if (!applications) {
            res.status(404).send("Error")
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
        const {jobID, applicationID} = req.body;

        const job = await Job.findByPk(jobID);
        const application = await Application.findByPk(applicationID);
        const requiredDocuments = job.RequiredDocuments;
        // console.log(application);
        const resume = application.Resume;
        const cover = application.CoverLetter;
        const engSample = application.EnglishSample;
        console.log(resume);
        console.log(cover);
        console.log(engSample);

        // console.log(reqs);

        Object.keys(requiredDocuments).forEach(key => {
            // console.log(requiredDocuments[key]);
            if (requiredDocuments[key]) {
                switch (key) {
                    case "Resume":
                        console.log("resume case")
                        if (!application.Resume) {
                            console.log("resume not found")
                            return res.status(200).send(false);
                        }
                        break;
                    case "CoverLetter":
                        console.log("cover case")
                        if (!application.CoverLetter) {
                            return res.status(200).send(false);
                        }
                        break;
                    case "EnglishSample":
                        console.log("english case")
                        if (!application.EnglishSample) {
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
        const {student, job} = req.body;

        const interest = await Interest.findOne({
            where: {
                studentID: student,
                jobID: job,
                [Sequelize.Op.or]: [
                    { Direction: "RECRUITER" },
                    { Direction: "MUTUAL" }
                ]
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

exports.createBookmark = async (req, res) => {
    try {
        const {student, job} = req.body;

        const bookmark = await Bookmark.create({
            JobID: job,
            StudentID: student,
            Direction: 'STUDENT'
        });

        if (bookmark) {
            res.status(200).send({
                message: "Bookmark successfully created",
                send: bookmark
            })
        } else {
            res.status(400).send( "Other error")
        }
    } catch (error) {
        res.status(400).send({message: "Error bookmarking job", error: error.message})
    }
}

exports.deleteBookmark = async (req, res) => {
    try {
        const {stu, job} = req.body;

        const bookmark = await Bookmark.destroy({
            where: {
                StudentID: stu,
                JobID: job,
                Direction: "STUDENT"
            }
        });

        if (!bookmark) {
            res.status(404).send("Bookmark not found");
        } else {
            res.status(200).send({
                message: "Successfully removed bookmark",
                send: bookmark
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