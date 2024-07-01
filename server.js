const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');                  // parsing for middleware
delete require.cache[require.resolve('dotenv/config')];
const db = require('./models');
require('dotenv').config();

const accountRoutes = require('./routes/accountRoutes');
const profileRoutes = require('./routes/profileRoutes');
const actionRoutes = require('./routes/actionRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/profile', profileRoutes);
app.use('/action', actionRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
