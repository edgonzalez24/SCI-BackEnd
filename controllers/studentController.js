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
    try {
        let students = await Student.find();
        if (students) {
            return res.status(201).json({
                ok: true,
                students
            })
        }
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