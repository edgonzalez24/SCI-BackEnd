const { Router } = require('express');
const router = Router();
const { addBook, allBook } = require('../controllers/bookController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/add',
    validarJWT, [
        check('title_book', 'El campo Title Book es obligatorio').not().isEmpty(),
        validarCampos
    ], addBook)


router.get('/all', allBook)


module.exports = router;