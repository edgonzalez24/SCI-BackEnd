const { request } = require("express");

const jwt = require('jsonwebtoken');


const generarJWT = (id, email) => {

    return new Promise((resolve, reject) => {
        const payload = { id, email };

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        })
    })

}


module.exports = {
    generarJWT
}