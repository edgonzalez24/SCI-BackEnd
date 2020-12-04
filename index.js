const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');




//Server
const app = express();

// Read 
app.use(express.json());

// CORS
app.use(cors())


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/book', require('./routes/book'));
app.use('/api/category', require('./routes/category'));
app.use('/api/loan', require('./routes/loan'));
app.use('/api/return', require('./routes/return'));
app.use('/api/students', require('./routes/students'));
app.use('/api/mail', require('./routes/mail'));


// BD 
dbConnection();



// Public
app.use(express.static('public'))
    // Listen Request
app.listen(process.env.PORT, () => console.log('Server Corriendo'))