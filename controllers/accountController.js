const Account = require('../models/accountModel');
// HANDLES BOTH STUDENTS AND RECRUITERS

exports.createStudent = async (req, res) => {
    // Logic to create a new student
    try {
        const {FirstName, LastName, School, EmailID, AcademicYear, Age, AcademicMajor, GPA, WorkExperience, PersonalStatement, Experience} = req.body;

        const newStudent = await Account.Student.create({
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
        res.status(400).send({message: "Error creating new student", error: error.message});
    }
};

exports.updateStudent = async (req, res) => {
    // Logic to update a student by ID
    try {
        const studentID = req.params.studentID //Need to be able to get studentID
        const updatedData = req.body;

        // TODO: Specify which fields to be updated
        const [updated] = await Account.Student.update(updatedData, {
            where: {id: studentID}
        });

        if (updated) {
            const updatedStudent = await Account.Student.findByPk(studentID);
            res.status(200).send(updatedStudent);
        } else {
            res.status(404).send({message: "Student not found"});
        }
    } catch (error) {
        res.status(400).send({message: "Error updating student", error: error.message});

    }
};

exports.deleteStudent = async (req, res) => {
    // Logic to delete a student by ID
    try {
        const deleteID = req.params.studentID //Need to be able to get studentID

        const toDelete = await Account.Student.destroy({
            where: {id: deleteID}
        });

        if (toDelete) {
            res.status(200).send({message: "Successfully deleted student"});
        } else {
            res.status(404).send({message: "Student not found"});
        }
    } catch (error) {
        res.status(400).send({message: "Error deleting student", error: error.message});
    }
};

exports.createRecruiter = async (req, res) => {
    try {
        const {RecruiterID, FirstName, LastName, CompanyID, EmailID, CompanyName, Roles, Locations} = req.body;

        const newRecruiter = await Account.Recruiter.create({
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
        res.status(400).send({message: "Error creating new recruiter", error: error.message});
    }
};

exports.updateRecruiter = async (req, res) => {
    // Logic to update a recruiter by ID
    try {
        const recruiterID = req.params.recruiterID //Need to be able to get recruiterID
        const updatedData = req.body;

        // TODO: update which fields to be updated
        const [updated] = await Account.Recruiter.update(updatedData, {
            where: {id: recruiterID}
        });

        if (updated) {
            const updatedRecruiter = await Account.Recruiter.findByPk(recruiterID);
            res.status(200).send(updatedRecruiter);
        } else {
            res.status(404).send({message: "Recruiter not found"});
        }
    } catch (error) {
        res.status(400).send({message: "Error updating recruiter", error: error.message});

    }
};

exports.deleteRecruiter = async (req, res) => {
    // Logic to delete a recruiter by ID
    try {
        const deleteID = req.params.recruiterID //Need to be able to get recruiterID

        const toDelete = await Account.Recruiter.destroy({
            where: {id: deleteID}
        });

        if (toDelete) {
            res.status(200).send({message: "Successfully deleted recruiter"});
        } else {
            res.status(404).send({message: "Recruiter not found"});
        }
    } catch (error) {
        res.status(400).send({message: "Error deleting recruiter", error: error.message});
    }
};