const { response } = require('express');
const nodemailer = require('nodemailer');

const sendMail = async(req, res = response) => {
    const { name, lastname, bookName, isbn } = req.body;
    try {
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
                "\n Nombre de Libro: " + bookName + "con codigo ISBN: " + isbn
        };
        console.log(mailOptions.text)

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

module.exports = {
    sendMail
}