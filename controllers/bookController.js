const { response } = require('express');
const express = require('express');
const Book = require('../models/BookModel')
const Category = require('../models/CategoryModel')

const addBook = async(req, res = response) => {
    const { isbn_book } = req.body;
    try {
        let book = await Book.findOne({ isbn_book })
        if (book) {
            return res.status(400).json({
                ok: false,
                message: 'Libro ya fue registrado'
            });
        }
        book = new Book(req.body)
        await book.save();


        return res.status(201).json({
            ok: true,
            message: 'Registro guardado existosamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al registrar Libro'
        });
    }

}

const allBook = async(req, res = response) => {
    const page = parseInt(req.query.pages);
    const size = 5;
    const query = {};
    try {
        if (page < 0 || page === 0) {
            return res.status(400).json({
                ok: false,
                message: 'Numero de paginas debe iniciar en 1'
            });
        }
        query.skip = size * (page - 1);
        query.limit = size;

        await Book.count({}, ((err, totalCount) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error'
                });
            }
            Book.find({}, {}, query, ((err, data) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Error en solicitud'
                    });
                } else {
                    Category.populate(data, { path: 'category' }, ((err, data) => {
                        res.status(201).json({
                            ok: true,
                            books: data,
                            pages: totalCount
                        })
                    }));
                }
            }));
        }));

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }

}

const newBooks = async(req, res = response) => {
    try {
        Book.find({}, function(err, books) {
            Category.populate(books, { path: 'category' }, function(err, books) {
                res.status(201).json({
                    ok: true,
                    books
                })
            });
        }).sort({ $natural: -1 }).limit(10);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}

const updateBook = async(req, res = response) => {
    const bookId = req.params.id;
    try {
        const books = await Book.findById(bookId);
        if (!books) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró libro'
            });
        }
        const newBook = {
            ...req.body
        }
        const actualBook = await Book.findByIdAndUpdate(bookId, newBook, {
            new: true
        });

        res.status(201).json({
            ok: true,
            message: 'Se ha editado con exito'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}

const deleteBook = async(req, res = response) => {
    const bookId = req.params.id;
    try {
        const books = await Book.findById(bookId);
        if (!books) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró libro'
            })
        }
        const actualBook = await Book.findOneAndDelete(bookId);

        res.status(201).json({
            ok: true,
            message: 'Registro eliminado existosamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}
const detailBook = async(req, res = response) => {
    const { id } = req.query;
    try {
        const book = await Book.findById(id);
        if (book) {
            return res.status(201).json({
                ok: true,
                book
            });
        }

        res.status(401).json({
            ok: false,
            message: 'Libro no encontrado'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}


module.exports = {
    addBook,
    updateBook,
    deleteBook,
    allBook,
    detailBook,
    newBooks
}