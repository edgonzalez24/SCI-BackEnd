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

module.exports = {
    addCategory,
    allCategory
}