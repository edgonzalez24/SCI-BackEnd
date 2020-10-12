const { Schema, model } = require('mongoose');

const loanSchema = Schema({
    id_student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    id_book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
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


module.exports = model('Loan', loanSchema)