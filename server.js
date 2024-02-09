const express = require('express');
const bodyParser = require('body-parser');                  // parsing for middleware
delete require.cache[require.resolve('dotenv/config')];
const db = require('./models');
require('dotenv').config();

const accountRoutes = require('./routes/accountRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/recruiter', recruiterRoutes);
app.use('/student', studentRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
