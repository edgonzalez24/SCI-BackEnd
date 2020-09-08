const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    nameCategory: {
        type: String,
        require: true
    }
})


module.exports = model('Categoria', categorySchema)