const { response } = require('express');
const express = require('express');
const Loan = require('../models/LoansModel');

const addLoan = async(req, res = response) => {
    try {
        const lend = new Loan(req.body)
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

const updateLoan = async(req, res = response) => {
    const leandId = req.params.id;
    try {
        const lends = await Loan.findById(leandId);
        if (!lends) {
            return res.status(404).json({
                ok: false,
                message: 'Not Found'
            })
        }
        const newLoan = {
            ...req.body
        }
        const actualLoan = await Loan.findByIdAndUpdate(leandId, newLoan, { new: true });

        res.status(201).json({
            ok: true,
            lends: actualLoan
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error'
        });
    }
}


module.exports = {
    addLoan,
    updateLoan
}