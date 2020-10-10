const { response } = require('express');
const express = require('express');
const Book = require('../models/BookModel')
const Category = require('../models/CategoryModel')

const addBook = async(req, res = response) => {

    // const { nameBook } = req.body; 
    try {
        const Book = new Book(req.body)
        await Book.save();


        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar el dato'
        });
    }

}

const allBook = async(req, res = response) => {

    try {
        let books = await Book.find({}, () => {
            Category.populate(books, { path: "autor" }, () => {
                if (books) {
                    return res.status(201).json({
                        ok: true,
                        books
                    })
                }
            })
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const deleteBook = async(req, res = response) => {
    await console.log('Delete Book')
}

const updateBook = async(req, res = response) => {
    await console.log('Delete Book')
}

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    allBook
}