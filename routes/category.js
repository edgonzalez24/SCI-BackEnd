const { Router } = require('express');
const router = Router();
const { addCategory } = require('../controllers/categoryController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')



router.post('/add', [
    check('nameCategory', 'El campo nameCategory es obligatorio').not().isEmpty(),
    validarCampos
], addCategory)


module.exports = router;