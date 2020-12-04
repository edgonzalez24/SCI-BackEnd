const { response } = require('express');
const Loan = require('../models/LoansModel');
const Student = require('../models/StudentsModel');
const Book = require('../models/BookModel');

const addLoan = async(req, res = response) => {
    const { id_student, id_book } = req.body;
    try {
        const loan = new Loan(req.body);
        await loan.save();
        const students = await Student.findById(id_student);
        const books = await Book.findById(id_book);

        if (students && books) {
            const updateLoanStatus = {
                loanStatus: true,
            };
            await Student.findByIdAndUpdate(id_student, updateLoanStatus);

            const updateBookStatus = {
                status: false,
            };
            await Book.findByIdAndUpdate(id_book, updateBookStatus);

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

const allLoans = async(req, res = response) => {
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

        await Loan.count({}, ((err, totalCount) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error'
                });
            }
            Loan.find({}, {}, query, ((err, data) => {
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
                                loans: data,
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

const deleteLoan = async(req, res = response) => {
    const { id_student, id_book, id_loan } = req.body;
    console.log(id_loan);
    try {
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
                message: 'Registro eliminado existosamente'
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}


module.exports = {
    addLoan,
    allLoans,
    deleteLoan,
}