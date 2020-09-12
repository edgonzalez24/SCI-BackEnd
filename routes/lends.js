const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { addLend } = require('../controllers/lendController');
const { validarCampos } = require('../middlewares/validar-campos')


router.post('/add', [
    check('date_land', 'El campo date es obligatorio').not().isEmpty(),
    validarCampos
], addLend);

module.exports = router;