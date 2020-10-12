const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    usename: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    rol: {
        type: String,
        require: true,
    }
})


module.exports = model('Usuario', UserSchema)