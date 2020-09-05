const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();


console.log(process.env)



//Server
const app = express();

// Read 
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// BD 
dbConnection();


// Public
app.use(express.static('public'))
    // Listen Request
app.listen(process.env.PORT, () => console.log('Server Corriendo'))