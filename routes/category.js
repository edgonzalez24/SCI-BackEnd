const { Router } = require('express');
const router = Router();
const { addCategory, allCategory } = require('../controllers/categoryController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')



router.post('/add', [
    check('name_category', 'El campo name category es obligatorio').not().isEmpty(),
    validarCampos
], addCategory)

router.get('/all', allCategory)
module.exports = router;