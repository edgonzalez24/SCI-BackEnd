const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name_category: {
        type: String,
        require: true
    }
})


module.exports = model('Categoria', categorySchema)