const Student = require('../models/studentModel');
const Recruiter = require('../models/recruiterModel');
const Company = require("../models/companyModel");
const Job = require("../models/jobModel");
const { where } = require('sequelize');
const {Bookmark} = require("../models");

// TODO: add gets for all students, recruiters, jobs, companies and applications

exports.createStudent = async (req, res) => {
    try {
        const { StudentID, FirstName, LastName, School, EmailID, AcademicYear, Age, ResumeLink, AcademicMajor, GPA, WorkExperience, PersonalStatement, Experience, MaxQuota, Quota, Preference, Interest, Skills, StartAvailability, Duration, Season, Location} = req.body;


        const newStudent = await Student.create({
            StudentID,
            FirstName,
            LastName,
            School,
            EmailID,
            AcademicYear,
            Age,
            ResumeLink,
            AcademicMajor,
            GPA,
            WorkExperience,
            PersonalStatement,
            Experience,
            MaxQuota,
            Quota,
            Preference,
            Interest,
            Skills,
            StartAvailability,
            Duration,
            Season,
            Location
        });

        res.status(201).send(newStudent);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error creating new student", error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { studentID, updatedData } = req.body;

        console.log("Received body:", JSON.stringify(req.body, null, 2));

        console.log("Detailed updatedData:", JSON.stringify(updatedData, null, 2));

        const [updated] = await Student.update(updatedData, {
            where: { StudentID: studentID }
        });

        if (updated) {
            const updatedStudent = await Student.findByPk(studentID);
            res.status(200).send(updatedStudent);
        } else {
            res.status(404).send({ message: "Student not found or no attributes modified" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error updating student", error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const {deleteID} = req.body;

        const deleted = await Student.destroy({
            where: { studentID: deleteID }
        });

        if (deleted) {
            res.status(200).send({ message: "Successfully deleted student" });
        } else {
            res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error deleting student", error: error.message });
    }
};

// exports.getStudents = async (req, res) => {
//     try {
//         let students = await Student.findAll ({
//             attributes: ['StudentId', 'FirstName', 'LastName', 'School', 'WorkExperience']
//         });

//         console.log("WRONG PLACE");

//         res.status(200).send({message: "Students are listed", data: students});
//     } catch (error) {
//         res.status(400).send({ message: "Error getting all students", error: error.message });
//     }
// };

exports.createRecruiter = async (req, res) => {
    try {
        const { RecruiterID, FirstName, LastName, CompanyID, EmailID, CompanyName, Roles, Locations } = req.body;

        const newRecruiter = await Recruiter.create({
            RecruiterID,
            FirstName,
            LastName,
            CompanyID,
            EmailID,
            CompanyName,
            Roles,
            Locations
        });

        res.status(201).send(newRecruiter);

    } catch (error) {
        res.status(400).send({ message: "Error creating new recruiter", error: error.message });
    }
};

exports.updateRecruiter = async (req, res) => {
    try {
        const {recruiterID, updatedData} = req.body;

        const [updated] = await Recruiter.update(updatedData, {
            where: { RecruiterID: recruiterID }
        });

        if (updated) {
            const updatedRecruiter = await Recruiter.findByPk(recruiterID);
            res.status(200).send({message: "Recruiter successfully updated", data: updatedRecruiter});
        } else {
            res.status(404).send({ message: "Recruiter not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error updating recruiter", error: error.message });
    }
};

exports.deleteRecruiter = async (req, res) => {
    try {
        const {deleteID} = req.body;

        const deleted = await Recruiter.destroy({
            where: { RecruiterID: deleteID }
        });

        if (deleted) {
            res.status(200).send({ message: "Successfully deleted recruiter" });
        } else {
            res.status(404).send({ message: "Recruiter not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error deleting recruiter", error: error.message });
    }
};

exports.getRecruiters = async (req, res) => {
    try{
        const {companyID} = req.body;

        let recruiters;
        if (companyID) {
            // if companyid was provided then get recrutiers for a specific company
            recruiters = await Recruiter.findAll({
                where: {
                    CompanyID: companyID
                },
                attributes: ['RecruiterID', 'FirstName', 'LastName', 'CompanyName']
            })
        } else {
            recruiters = await Recruiter.findAll({
                attributes: ['RecruiterID', 'FirstName', 'LastName', 'CompanyName']
            })
        }
        res.status(200).send({message: "Recruiters are listed", data: recruiters})
    } catch (error) {
        res.status(400).send({message: "Error getting all recuiters", error: error.message});
    }
};

exports.createCompany = async (req, res) => {
    try {
        const {Name, Industry, ContactEmail} = req.body;

        const newCompany = await Company.create({
            Name,
            Industry,
            ContactEmail
        });

        res.status(201).send(newCompany);

    } catch (error) {
        res.status(400).send({message: "Error creating new company", error: error.message});
    }
}

// Update an existing company
exports.updateCompany = async (req, res) => {
    try {
        const { companyID, updatedData } = req.body;

        const [updated] = await Company.update(updatedData, {
            where: { CompanyID: companyID }
        });

        if (updated) {
            const updatedCompany = await Company.findByPk(companyID);
            res.status(200).send(updatedCompany);
        } else {
            res.status(404).send({ message: "Company not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error updating company", error: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const {deleteId} = req.body;

        const deleted = await Company.destroy({
            where: {CompanyID: deleteId}
        });

        if (deleted) {
            res.status(200).send({message: "Successfully deleted company"});
        } else {
            res.status(404).send({message: "Company not found"});
        }

    } catch (error) {
        res.status(400).send({message: "Error deleting company"});
    }
}

exports.getQuota = async (req, res) => {
    try {
        const {studentID} = req.query;

        const stu = await Student.findByPk(studentID)

        if (!stu) {
            res.status(404).send({message: "Student not found"});
        } else {
            const quota = stu.Quota;
            res.status(200).send({quota});
        }
    } catch (error) {
        res.status(400).send({message: "Error getting student quota"});
    }
}

exports.getBookmarkAmount = async (req, res) => {
    try {
        const {studentID} = req.query;

        const bookmarksAssociated = await Bookmark.findAll({
            where: {StudentID: studentID}
        })

        if (!bookmarksAssociated) {
            res.status(404).send("Student not found");
        } else {
            res.status(201).send(bookmarksAssociated);
        }
    } catch (error) {
        res.status(400).send({
            message: "Error in getting bookmark amount",
            error: error.message
        })
    }
}

exports.getStudent = async (req, res) => {
    try {
        const {studentID} = req.body;

        const stu = await Student.findByPk(studentID);

        if (!stu) {
            res.status(404).send({message: "Student not found"});
        } else {
            res.status(200).json({stu});
        }
    } catch (error) {
        res.status(400).send({message: "Error getting student", error: error.message})
    }
}
