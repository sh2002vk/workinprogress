const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { promisify } = require('util');
const { pipeline } = require('stream');
const Job = require('../models/jobModel');
const Application = require("../models/applicationModel");
const Bookmark = require("../models/bookmarkModel");
const Recruiter = require('../models/recruiterModel');
const Student = require('../models/studentModel');
const Shortlist = require('../models/shortlistModel');
const Sequelize = require('sequelize');
const sequelize = require('../database');
const { Op, where } = require('sequelize');
const {Company} = require("../models");

exports.getGCPFiles = async (req, res) => {
    const { filename } = req.body;
    const bucketName = 'wip_storage_bucket';
    const storage = new Storage({
        keyFilename: path.join(process.cwd(), 'google-key.json'),
    });
    const file = storage.bucket(bucketName).file(filename);

    try {
        const [exists] = await file.exists();
        if (!exists) {
            return res.status(404).json({ error: 'File not found' });
        }

        const streamPipeline = promisify(pipeline);
        await streamPipeline(file.createReadStream(), res);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ error: 'Error fetching file' });
    }
};

exports.createJob = async (req, res) => {
    //Logic to create a job
    try {
        const {RecruiterID, CompanyID, Type, Role, Location, Experience, Pay, Environment, Duration, Terms, Industry, RequiredDocuments, DatePosted, Status} = req.body;
        const newJob = await Job.create({
            RecruiterID, 
            CompanyID,
            Type,
            Role, 
            Location, 
            Experience, 
            Pay, 
            Environment, 
            Duration, 
            Terms,
            Industry, 
            RequiredDocuments,
            DatePosted,
            Status
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
            const updatedJob = await Job.findOne({
                where: {JobID: jobID}
            });
            res.status(200).send(updatedJob);
        } else {
            res.status(404).send("Update not made")
        }
    } catch (error) {
        res.status(400).send({message:"Error updated job", error: error.message});
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const {jobID} = req.body;

        const deleted = await Job.destroy({
            where: {JobID: jobID}
        });

        if (deleted) {
            res.status(200).send({message: "Successfully deleted job"})
        } else {
            res.status(404).send({message: "Job not found"});
        }
    } catch (error) {
        res.status(400).send({message: "Error deleting job"});
    }
}

exports.getApplications = async (req, res) => {
    //Logic to get applicants of a job
    try {
        const {recruiterID} = req.query;
        const applications = await Application.findAll({
            where: {RecruiterID: recruiterID}
        })
        res.status(201).send(applications);
    } catch (error) {
        res.status(400).send({message: "Error fetching applicants", error: error.message});
    }
}

exports.getNewApplications = async (req, res) => {
    //Logic to get applicants of a job
    try {
        const {recruiterID} = req.query;
        const applications = await Application.findAll({
            where: {RecruiterID: recruiterID, Status: "APPLIED"},
            include: [
                {
                    model: Job,
                    attributes: ['Role']
                },
                {
                    model: Student,
                    attributes: ['FirstName', 'School', 'AcademicMajor']
                }
            ]
        })
        res.status(201).send(applications);
    } catch (error) {
        res.status(400).send({message: "Error fetching applicants", error: error.message});
    }
}

exports.getJobApplicants = async (req, res) => {
    //Logic to get applicants of a job
    try {
        const {jobID} = req.query;

        const students = [];
        const applications = await Application.findAll({
            where: {JobID: jobID}
        })
        for (let i of applications) {
            students.push(i.get('ApplicationID'));
        }
        res.json(students);
    } catch (error) {
        res.status(400).send({message: "Error fetching applicants", error: error.message});
    }
}

exports.getActivePostingInformation = async (req, res) => {
    try {
        const {recruiterID} = req.query;
        const assembledRows = []
        const jobs = await Job.findAll({
            where: {RecruiterID: recruiterID, Status: "COMPLETED"}
        })
        await Promise.all(jobs.map(async (job) => {
            const item = {};

            // Fetch all applications for the current job
            const applications = await Application.findAll({
                where: {JobID: job.JobID},
                include: [
                    {
                        model: Student,
                        attributes: ['FirstName']
                    }
                ]
            });

            const interactedCount = await Application.count({
                where: {
                    JobID: job.JobID,
                    Status: {
                        [Op.ne]: 'Applied'
                    }
                }
            });

            // Count bookmarks for the current job
            const saves = await Bookmark.count({
                where: {JobID: job.JobID, Direction: "STUDENT"}
            });

            const percentage = applications.length > 0 ? (interactedCount / applications.length) * 100 : 0;

            item.job = job;
            item.applications = applications;
            item.interactedApplications = interactedCount;
            item.percentage = percentage;
            item.saves = saves;

            assembledRows.push(item);
        }));
        res.status(201).send(assembledRows);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

exports.addStudentToBookMark = async (req, res) => {
    try {
        const {
            recruiterID,
            jobID,
            studentID
        } = req.body;

        let whereClause = {
            StudentID: studentID,
            RecruiterID: recruiterID,
            Direction: "RECRUITER"
        };
        if (jobID) {
            whereClause.jobID = jobID;
        }
        const newBookmark = await Bookmark.create(whereClause);
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
            level, // used as 1-4 for ug, 5 master, 6 phd,
            location, // location
            program // educational program
        } = req.body;

        let whereClause = {};

        if (preference) {
            if (Array.isArray(preference)) {  // handles the case of it being an array for multiple preferences
                if (preference.length > 0) {
                    whereClause.Preference = {
                        [Sequelize.Op.in]: preference
                    };
                }
            } else {
                whereClause.Preference = preference;
            }
        }
        if (duration) {
            if (Array.isArray(duration)) {  // handles the case of it being an array for multiple durations
                if (duration.length > 0) {
                    whereClause.Duration = {
                        [Sequelize.Op.in]: duration
                    };
                }
            } else {
                whereClause.Duration = duration;
            }
        } 
        if (season) {
            if (Array.isArray(season)) {  // handles the case of it being an array for multiple seasons
                if (season.length > 0) {
                    whereClause.Season = {
                        [Sequelize.Op.in]: season
                    };
                }
            } else {
                whereClause.Season = season;
            }
        }
        if (level) {
            if (Array.isArray(level)) {  // handles the case of it being an array for multiple levels
                if (level.length > 0) {
                    const parsedLevels = level.map(l => parseInt(l));
                    whereClause.AcademicYear = {
                        [Sequelize.Op.in]: parsedLevels
                    };
                }
            } else {
                const parsedLevel = parseInt(level);
                whereClause.AcademicYear = parsedLevel;
            }
        }
        if (location) {
            whereClause.Location = location;
        }
        if (program) {
            if (Array.isArray(program)) {  // handles the case of it being an array for multiple programs
                if (program.length > 0) {
                    whereClause.AcademicMajor = {
                        [Sequelize.Op.in]: program
                    };
                }
            } else {
                whereClause.AcademicMajor = program;
            }
        }

        let students = await Student.findAll({
            where: whereClause
        });

        res.status(200).send({ message: "Filtered students are listed", data: students });
    } catch (error) {
        res.status(400).send({ message: "Error filtering students", error: error.message });
    }
}

// Get the full profile of a recruiter
exports.getFullProfile = async (req, res) => {
    try {
        const { recruiterID } = req.query;

        console.log(`recruiterID: ${recruiterID}, type: ${typeof recruiterID}`);
        //Console logs for debugging purpose
        // console.log(recruiterID === "Yng3AaKdUNWnkFOXmutw9Gw3Amo1");
        // const obj = await Recruiter.findAll();
        // console.log(obj);
        // console.log(obj[0].dataValues.RecruiterID)
        // console.log(obj[0].dataValues.RecruiterID === "Yng3AaKdUNWnkFOXmutw9Gw3Amo1")
        // console.log(obj[0].dataValues.RecruiterID === recruiterID)
        // const recruiterIDArray = Array.from(recruiterID);
        // const databaseRecruiterIDArray = Array.from(obj[0].dataValues.RecruiterID);
        // console.log(`recruiterID char codes: ${recruiterIDArray.map(char => char.charCodeAt(0))}`);
        // console.log(`Database RecruiterID char codes: ${databaseRecruiterIDArray.map(char => char.charCodeAt(0))}`);


        const recruiter = await Recruiter.findByPk(recruiterID);

        if (recruiter) {
            res.status(200).send({ message: "Full recruiter profile", data: recruiter });
        } else {
            res.status(404).send({ message: "Recruiter not found: " + recruiterID, });
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
        const { jobID } = req.query;

        const shortlisted = await Shortlist.findAll({
            where: { JobID: jobID },
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
        const { recruiterID } = req.query;

        const jobPostings = await Job.findAll({
            where: { RecruiterID: recruiterID },
            attributes: ['JobID', 'RecruiterID', 'CompanyID', 'Role', 'Location', 'DatePosted', 'Experience', 'Pay', 'Environment', 'Duration', 'Terms', 'Industry', 'JobDescription', 'JobQualification', 'Status', 'RequiredDocuments'],
        });

        // if (jobPostings.length === 0) {
        //     return res.status(404).send({ message: "No job postings found for this recruiter" });
        // }

        res.status(200).send({ message: "Job postings for the recruiter", data: jobPostings });
    } catch (error) {
        res.status(400).send({ message: "Error getting job postings", error: error.message });
    }
};

exports.removeStudentFromBookmark = async (req, res) => {
    try {
        const { recruiterID, jobID, studentID } = req.body;

        let whereClause = {
            RecruiterID: recruiterID,
            StudentID: studentID,
            Direction: "RECRUITER"
        };

        if (jobID) {
            whereClause.JobID = jobID;
        }

        const deleted = await Bookmark.destroy({
            where: whereClause
        });

        if (deleted) {
            res.status(200).send({ message: "Successfully removed bookmark" });
        } else {
            res.status(404).send({ message: "Bookmark not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error removing bookmark", error: error.message });
    }
};

exports.getBookmarkedStudents = async (req, res) => {
    try {
        const { recruiterID } = req.query;

        const bookmarks = await Bookmark.findAll({
            where: {
                RecruiterID: recruiterID,
                Direction: "RECRUITER"
            },
            include: [{
                model: Student
            }]
        });

        if (bookmarks.length === 0) {
            return res.status(404).send({ message: "No bookmarked students found" });
        }

        const studentIDs = bookmarks.map(bookmark => bookmark.StudentID);
        const students = await Student.findAll({
            where: {
              StudentID: {
                [Op.in]: studentIDs
              }
            }
        });

        res.status(200).send({ message: "Bookmarked students", data: students });
    } catch (error) {
        res.status(400).send({ message: "Error getting bookmarked students", error: error.message });
    }
};

