const { response } = require('express');
const express = require('express');
const Category = require('../models/CategoryModel')

const addCategory = async(req, res = express.response) => {
    try {
        const category = new Category(req.body)
        await category.save();


        return res.status(201).json({
            ok: true,
            message: 'Registro guardado existosamente'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Error al registrar estudiante'
        });
    }

}

const allCategory = async(req, res = response) => {
    try {
        let categories = await Category.find();
        if (categories) {
            return res.status(201).json({
                ok: true,
                categories
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Bad Request'
        });
    }
}

const updateCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const categories = await Category.findById(categoryId)
        if (!categories) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró categoria'
            })
        }

        const newCategory = {
            ...req.body
        }
        const actualCategory = await Category.findByIdAndUpdate(categoryId, newCategory, { new: true });

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
const deleteCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const categories = await Category.findById(categoryId)
        if (!categories) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró categoria'
            })
        }

        const actualCategory = await Category.findByIdAndDelete(categoryId);

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
    addCategory,
    allCategory,
    updateCategory,
    deleteCategory
}