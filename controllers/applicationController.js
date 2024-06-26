const Application = require('../models/applicationModel')

exports.getApplication = async (req, res) => {
    try {
        const {applicationID} = req.body;

        const application = await Application.findByPk(applicationID);

        if (!application) {
            res.status(404).send("No application found")
        } else {
            res.status(200).send(application)
        }
    } catch (error) {
        res.status(400).send({
            message: "Error getting application",
            error: error.message
        })
    }
}