const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');                  // parsing for middleware
delete require.cache[require.resolve('dotenv/config')];
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(bodyParser.json());

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
// });


app.use('/students', studentRoutes);
app.use('/recruiters', recruiterRoutes);
app.use('/applications', applicationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});