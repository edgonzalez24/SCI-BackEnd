const { Router } = require('express');
const router = Router();
const { registroInventario } = require('../controllers/registroController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

router.post('/add', [
    check('nameBook', 'El campo BookName es obligatorio').not().isEmpty(),
    validarCampos
], registroInventario)


module.exports = router;