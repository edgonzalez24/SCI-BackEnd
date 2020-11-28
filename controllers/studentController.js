const { response } = require('express');
const express = require('express');
const Student = require('../models/StudentsModel');

const addStudent = async(req, res = express.response) => {
    try {
        const student = new Student(req.body)
        await student.save();


        return res.status(201).json({
            ok: true,
            message: 'Registro guardado existosamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al registrar estudiante'
        });
    }

}

const allStudents = async(req, res = response) => {
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

        await Student.count({}, ((err, totalCount) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error'
                });
            }
            Student.find({}, {}, query, ((err, data) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Error en solicitud'
                    });
                } else {
                    const totalPages = Math.ceil(totalCount / size);
                    return res.status(201).json({
                        ok: true,
                        students: data,
                        pages: totalPages
                    })
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

const updateStudent = async(req, res = response) => {
    const studentId = req.params.id;

    try {
        const students = await Student.findById(studentId)
        if (!students) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró estudiante'
            })
        }

        const newStudent = {
            ...req.body
        }
        const actualStudent = await Student.findByIdAndUpdate(studentId, newStudent, { new: true });

        res.status(201).json({
            ok: true,
            message: 'Se ha editado con exito'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}
const deleteStudent = async(req, res = response) => {
    const studentId = req.params.id;

    try {
        const students = await Student.findById(studentId)
        if (!students) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró estudiante'
            })
        }

        const actualStudent = await Student.findByIdAndDelete(studentId);

        res.status(201).json({
            ok: true,
            message: 'Registro eliminado existosamente'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}

module.exports = {
    addStudent,
    allStudents,
    updateStudent,
    deleteStudent
}