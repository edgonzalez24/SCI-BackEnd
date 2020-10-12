const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { addLoan } = require('../controllers/loansController');
const { validarCampos } = require('../middlewares/validar-campos')


router.post('/add', [
    check('date_land', 'El campo date es obligatorio').not().isEmpty(),
    validarCampos
], addLoan);

module.exports = router;