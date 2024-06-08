const Student = require('../models/studentModel');
const Recruiter = require('../models/recruiterModel');
const Company = require("../models/companyModel");
const { where } = require('sequelize');

// TODO: add gets for all students, recruiters, jobs, companies and applications

exports.createStudent = async (req, res) => {
    try {
        const { FirstName, LastName, School, EmailID, AcademicYear, Age, ResumeLink, AcademicMajor, GPA, WorkExperience, PersonalStatement, Experience } = req.body;

        const newStudent = await Student.create({
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
            Experience
        });

        res.status(201).send(newStudent);

    } catch (error) {
        res.status(400).send({ message: "Error creating new student", error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const studentID = req.params.studentID;
        const updatedData = req.body;

        // TODO: Update the parsing
        const [updated] = await Student.update(updatedData, {
            where: { StudentID: studentID }
        });

        if (updated) {
            const updatedStudent = await Student.findByPk(studentID);
            res.status(200).send(updatedStudent);
        } else {
            res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error updating student", error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const deleteID = req.params.studentID;

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
        const recruiterID = req.params.recruiterID;
        const updatedData = req.body;

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
        const deleteID = req.params.recruiterID;

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
        const companyID = req.params.companyID;

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

exports.deleteCompany = async (req, res) => {
    try {
        const deleteId = req.params.companyID;

        const deleted = await Company.destroy({
            where: {CompanyID: deleteId}
        });

        if (deleted) {
            res.status(201).send("Successfully deleted company");
        } else {
            res.status(404).send("Company not found");
        }

    } catch (error) {
        res.status(400).send("Error deleting company");
    }
}
