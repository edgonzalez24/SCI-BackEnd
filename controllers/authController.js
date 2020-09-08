const express = require('express');
const User = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const CreateUser = async(req, res = express.response) => {

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        user = new User(req.body)
            // Agregar Encriptacion
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        await user.save();
        // Generar token
        const token = await generarJWT(user.uid, user.email);
        res.status(201).json({
            ok: true,
            uid: user.id,
            email: user.email,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar el dato'
        });
    }

}
const loginUser = async(req, res = express.response) => {

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña es invalido'
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecta'
            })
        }

        // Generar token
        const token = await generarJWT(user.id, user.email);

        res.status(201).json({
            ok: true,
            uid: user.id,
            email: user.email,
            token
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar el dato'
        });
    }

}


const revalidarToken = async(req, res = express.response) => {

    const id = req.id;
    const email = req.email;

    const token = await generarJWT(id, email);

    res.status(201).json({
        ok: true,
        id,
        email,
        token
    })
}

module.exports = {
    CreateUser,
    loginUser,
    revalidarToken
}