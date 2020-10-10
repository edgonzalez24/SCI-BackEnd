const { Router } = require('express');
const router = Router();
const { addCategory, allCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')



router.post('/add', [
    check('name_category', 'El campo name category es obligatorio').not().isEmpty(),
    validarCampos
], addCategory)

router.get('/all', allCategory);

router.put('/update/:id', [
    check('name_category', 'El campo name category es obligatorio').not().isEmpty(),
    validarCampos
], updateCategory);

router.delete('/delete/:id', deleteCategory)
module.exports = router;