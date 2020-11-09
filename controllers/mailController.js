const { response } = require('express');
const nodemailer = require('nodemailer');
const Request = require('../models/RequestModel');

const sendMail = async(req, res = response) => {
    const { name, lastname, bookName, isbn } = req.body;
    try {
        const request = new Request(req.body);
        await request.save();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        let mailOptions = {
            to: 'edgoca2498@gmail.com',
            from: {
                name: 'SCI',
                email: 'info@sci.com',
            },
            subject: 'Solicitud de libro',
            text: 'Buen día, hay una nueva solicitud de prestamo, se detalla acontinuación:' +
                '\n' +
                '\n Datos de la solicitud:' +
                "\n Nombre: " + name +
                "\n Apellido: " + lastname +
                "\n Nombre de libro: " + bookName + "con codigo ISBN: " + isbn
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(401).json({
                    ok: false,
                    message: 'Error en la solicitud'
                });
            }
            res.status(201).json({
                ok: true,
                message: "Solicitud Enviada"
            });
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error'
        });
    }

}

const getNotifications = async(req, res = response) => {

    try {
        let notifications = await Request.find();
        if (notifications) {
            return res.status(201).json({
                ok: true,
                notifications
            })
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error'
        });
    }

}

const updateNotifications = async(req, res = response) => {
    try {
        const { id } = req.params
        const notifications = await Request.findById(id);
        const newNotification = {...req.body }
        const actualCategory = await Request.findByIdAndUpdate(id, newNotification);
        res.status(201).json({
            ok: true
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error'
        });
    }

}

module.exports = {
    sendMail,
    getNotifications,
    updateNotifications
}