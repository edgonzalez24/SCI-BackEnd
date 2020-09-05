const express = require('express');
const Libro = require('../models/LibroModelo')

const registroInventario = async(req, res = express.response) => {

    // const { nameBook } = req.body; 
    try {
        const libro = new Libro(req.body)
        await libro.save();


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

module.exports = {
    registroInventario
}