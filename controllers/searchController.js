const { response } = require('express');
const Book = require('../models/BookModel');

const searchBook = async(req, res = response) => {
    const { title_book } = req.query;
    console.log(title_book);
    try {
        let book = await Book.find({ 'title_book': { '$regex': title_book } })
        console.log(book)
        if (book) {
            return res.status(201).json({
                ok: true,
                book
            });
        }
        return res.status(400).json({
            ok: false,
            message: 'Libro no encontrado'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al hacer la peticion'
        });
    }

}

module.exports = {
    searchBook
}