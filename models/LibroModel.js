const { Schema, model } = require('mongoose');

const libroSchema = Schema({
    nameBook: {
        type: String,
        require: true
    }
})


module.exports = model('Libro', libroSchema)