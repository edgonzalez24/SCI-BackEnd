const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');




//Server
const app = express();

// Read 
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/category', require('./routes/category'))


// BD 
dbConnection();

// CORS
app.use(cors())


// Public
app.use(express.static('public'))
    // Listen Request
app.listen(process.env.PORT, () => console.log('Server Corriendo'))