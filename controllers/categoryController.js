const { response } = require('express');
const express = require('express');
const Category = require('../models/CategoryModel')

const addCategory = async(req, res = express.response) => {
    try {
        const category = new Category(req.body)
        await category.save();


        return res.status(201).json({
            ok: true
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar el dato'
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
            msg: 'Error'
        });
    }
}

const updateCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const categories = await Category.findById(categoryId)
        if (!categories) {
            return res.status(404).json({
                ok: true,
                msg: 'Not Found'
            })
        }

        const newCategory = {
            ...req.body
        }
        const actualCategory = await Category.findByIdAndUpdate(categoryId, newCategory, { new: true });

        res.status(201).json({
            ok: true,
            categories: actualCategory
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
}
const deleteCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const categories = await Category.findById(categoryId)
        if (!categories) {
            return res.status(404).json({
                ok: true,
                msg: 'Not Found'
            })
        }

        const actualCategory = await Category.findByIdAndDelete(categoryId);

        res.status(201).json({
            ok: true,
            msg: 'Delete Success'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
}

module.exports = {
    addCategory,
    allCategory,
    updateCategory,
    deleteCategory
}