const { Router } = require('express');
const router = Router();
const { addBook, allBook } = require('../controllers/registroController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

router.post('/add', [
    check('title_book', 'El campo Title Book es obligatorio').not().isEmpty(),
    validarCampos
], addBook)


router.get('/all', allBook)


module.exports = router;