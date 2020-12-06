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
                message: 'El usuario ya existe'
            });
        }
        user = new User(req.body)
            // Agregar Encriptacion
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        await user.save();
        // Generar token
        const token = await generarJWT(user.uid, user.email, user.rol, user.name, user.lastname, user.username);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            rol: user.rol,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Error al registrar el dato'
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
                message: 'Usuario o contraseña es invalido'
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password Incorrecta'
            })
        }

        // Generar token
        const token = await generarJWT(user.uid, user.email, user.rol, user.name, user.lastname, user.username);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            rol: user.rol,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al registrar el dato'
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