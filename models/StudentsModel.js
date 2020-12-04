const { Schema, model } = require('mongoose');

const StudentSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    lastname: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true
    },
    academic_degree: {
        type: String,
        require: true
    },
    section: {
        type: String,
        require: true
    },
    teacher: {
        type: String,
        require: true
    },
    loanStatus: {
        type: Boolean,
        require: true
    }
})


module.exports = model('Student', StudentSchema)