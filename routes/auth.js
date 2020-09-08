const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { CreateUser, loginUser, revalidarToken } = require('../controllers/authController');

router.post('/createuser', [
    check('email', 'El campo email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos
], CreateUser);

router.post('/login', [
    check('email', 'El campo email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos
], loginUser)

router.get('/renew', validarJWT, revalidarToken)


module.exports = router;