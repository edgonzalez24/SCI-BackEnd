const { Schema, model } = require('mongoose');

const returnSchema = Schema({
    id_student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    id_book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    date_return: {
        type: String,
        require: true
    },
})


module.exports = model('Return', returnSchema)