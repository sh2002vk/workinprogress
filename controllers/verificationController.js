// emailService.js
delete require.cache[require.resolve('dotenv/config')];
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Verification = require('../models/verificationModel');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: process.env.VERIFICATION_EMAIL,
    pass: process.env.VERIFICATION_PASSWORD
  }
});

exports.sendCode = async (req, res) => {
    try {
        const email = req.body.email;

        const existingUser = await Verification.findOne({ where: { EmailID: email } });

        if (existingUser) {
            return res.status(400).send({
                message: 'A verification code has already been sent to this email. Please check your inbox or try again later.',
            });
        }

        const code = crypto.randomBytes(3).toString('hex');  // 3 bytes -> 6 hexadecimals (2 hex per byte)
        await Verification.upsert({ EmailID: email, Code: code, CreatedAt: new Date() });
        // console.log('saved code in database');

        const mailOptions = {
            from: process.env.VERIFICATION_EMAIL,
            to: email,
            subject: 'WIP - Your Verification Code',
            text: `Your verification code for Work In Progress is: ${code}`
        };

        transporter.sendMail(mailOptions);

        res.status(200).send({
            message: "Uploaded and emailed verification code",
        })
    } catch (error) {
        console.log("ERROR", error);
        res.status(400).send({message: "Error creating verification code", error: error.message});
    }
}

exports.verifyCode = async (req, res) => {
    try {
        // console.log("hitting verify code endpoint");
        const { email, code } = req.body;

        const record = await Verification.findOne({ where: { EmailID: email } });

        if (record && record.Code === code) {
            res.status(200).json({ success: true, message: 'Code is valid' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid verification code' });
        }

    } catch (error) {
        console.log("ERROR", error);
        res.status(400).send({message: "Error verifying verification code", error: error.message});
    }
}
