const { Schema, model } = require('mongoose');

const requestSchema = Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    bookName: {
        type: String,
        require: true
    },
    isbn: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }
})


module.exports = model('Request', requestSchema)