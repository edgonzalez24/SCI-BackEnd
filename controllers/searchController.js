const { response } = require('express');
const Book = require('../models/BookModel');

const searchBook = async(req, res = response) => {
    const { title_book } = req.query;
    try {
        const regex = new RegExp(title_book, 'i');
        let books = await Book.find({ 'title_book': regex }).limit(10);
        if (books) {
            return res.status(201).json({
                ok: true,
                books
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