const { response } = require('express');
const express = require('express');
const Lend = require('../models/LendModel');

const addLend = async(req, res = response) => {
    try {
        const lend = new Lend(req.body)
        await lend.save();
        return res.status(201).json({
            ok: true
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error la registrar el dato'
        })
    }
}

const updateLend = async(req, res = response) => {
    const leandId = req.params.id;
    try {
        const lends = await Lend.findById(leandId);
        if (!lends) {
            return res.status(404).json({
                ok: false,
                message: 'Not Found'
            })
        }
        const newLend = {
            ...req.body
        }
        const actualLend = await Lend.findByIdAndUpdate(leandId, newLend, { new: true });

        res.status(201).json({
            ok: true,
            lends: actualLend
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error'
        });
    }
}


module.exports = {
    addLend,
    updateLend
}