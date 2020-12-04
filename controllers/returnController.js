const { response } = require('express');
const Return = require('../models/ReturnsModel');
const Student = require('../models/StudentsModel');
const Book = require('../models/BookModel');

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

module.exports = {
    allReturns,
}