const Recruiter = require('../models/recruiterModel');
const Company = require("../models/companyModel");

// Get all recruiters for a specific company
exports.getRecruiters = async (req, res) => {
    try {
        const { companyID } = req.body;

        const recruiters = await Recruiter.findAll({
            where: { CompanyID: companyID },
            attributes: ['RecruiterID', 'FirstName', 'LastName', 'EmailID', 'Roles', 'Locations']
        });

        if (recruiters) {
            res.status(200).send({ message: "Recruiters are listed", data: recruiters });
        } else {
            res.status(404).send({ message: "No recruiters found for this company" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error getting recruiters", error: error.message });
    }
};

// Get the full profile of a company
exports.getFullProfile = async (req, res) => {
    try {
        const { companyID } = req.body;

        const company = await Company.findByPk(companyID);

        if (company) {
            res.status(200).send({ message: "Company profile", data: company });
        } else {
            res.status(404).send({ message: "Company not found" });
        }
    } catch (error) {
        res.status(400).send({ message: "Error getting company profile", error: error.message });
    }
};