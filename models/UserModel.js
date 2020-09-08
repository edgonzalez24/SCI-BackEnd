const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
})


module.exports = model('Usuario', UserSchema)