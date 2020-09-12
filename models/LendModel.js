const { Schema, model } = require('mongoose');

const lendSchema = Schema({
    id_student: {
        type: String,
        require: true
    },
    date_land: {
        type: Date,
        require: true
    },
    status: {
        type: Number,
        require: true
    }

})


module.exports = model('Lend', lendSchema)