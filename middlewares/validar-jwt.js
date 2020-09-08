const { response } = require('express')
const jwt = require('jsonwebtoken')
const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { id, email } = jwt.verify(
            token, process.env.SECRET_JWT
        );

        req.id = id;
        req.email = email;



    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


    next();

}



module.exports = {
    validarJWT
}