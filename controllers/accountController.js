const Student = require('../models/studentModel');
const Recruiter = require('../models/recruiterModel');

exports.createStudent = async (req, res) => {
    try {
        const { FirstName, LastName, School, EmailID, AcademicYear, Age, AcademicMajor, GPA, WorkExperience, PersonalStatement, Experience } = req.body;

        const newStudent = await Student.create({
            FirstName,
            LastName,
            School,
            EmailID,
            AcademicYear,
            Age,
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
            where: { id: deleteID }
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
            where: { id: recruiterID }
        });

        if (updated) {
            const updatedRecruiter = await Recruiter.findByPk(recruiterID);
            res.status(200).send(updatedRecruiter);
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
            where: { id: deleteID }
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
