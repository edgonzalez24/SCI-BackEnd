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
    date_loan: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }

})


module.exports = model('Loan', loanSchema)