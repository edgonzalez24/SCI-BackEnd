const { response } = require('express');
const Return = require('../models/ReturnsModel');
const Student = require('../models/StudentsModel');
const Book = require('../models/BookModel');
const Loan = require('../models/LoansModel');


const allReturns = async(req, res = response) => {
    const page = parseInt(req.query.pages);
    const size = 15;
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

        await Return.count({}, ((err, totalCount) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error'
                });
            }
            Return.find({}, {}, query, ((err, data) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Error en solicitud'
                    });
                } else {
                    Student.populate(data, { path: 'id_student' }, (err, data) => {
                        Book.populate(data, { path: 'id_book' }, (err, data) => {
                            const totalPages = Math.ceil(totalCount / size);
                            return res.status(201).json({
                                ok: true,
                                returns: data,
                                pages: totalPages,
                                count: totalCount
                            })
                        });
                    });
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

const addReturn = async(req, res = response) => {
    const { id_student, id_book, id_loan } = req.body;
    try {
        const add = new Return(req.body);
        await add.save();
        const students = await Student.findById(id_student);
        const books = await Book.findById(id_book);

        if (students && books) {
            const updateLoanStatus = {
                loanStatus: false,
            };
            await Student.findByIdAndUpdate(id_student, updateLoanStatus);

            const updateBookStatus = {
                status: true,
            };
            await Book.findByIdAndUpdate(id_book, updateBookStatus);
            await Loan.findByIdAndDelete(id_loan);

            return res.status(201).json({
                ok: true,
                message: 'Registro guardado existosamente'
            });
        }


    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error la registrar el dato'
        })
    }
}

const deleteReturn = async(req, res = response) => {
    const id = req.params.id;
    try {
        const returns = await Return.findById(id);
        if (!returns) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró devolución'
            })
        }
        await Return.findByIdAndDelete(id);
        return res.status(201).json({
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

module.exports = {
    allReturns,
    addReturn,
    deleteReturn
}