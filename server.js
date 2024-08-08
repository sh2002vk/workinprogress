const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');                  // parsing for middleware
delete require.cache[require.resolve('dotenv/config')];
const db = require('./models');
require('dotenv').config();

const accountRoutes = require('./routes/accountRoutes');
const profileRoutes = require('./routes/profileRoutes');
const actionRoutes = require('./routes/actionRoutes');
const photoRoutes = require('./routes/photoRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/account', accountRoutes);
app.use('/profile', profileRoutes);
app.use('/action', actionRoutes);
app.use('/photo', photoRoutes)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
