const { Router } = require('express');
const router = Router();
const { addBook, allBook, updateBook, deleteBook } = require('../controllers/bookController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

// This is CRUD Register Book

router.post('/add',
    validarJWT, [
        check('title_book', 'El campo Title Book es obligatorio').not().isEmpty(),
        validarCampos
    ], addBook);

router.get('/all', allBook);

router.put('/update/:id', [
    check('title_book', 'El campo Title Book es obligatorio').not().isEmpty(),
    validarCampos
], updateBook);

router.delete('/delete/:id', deleteBook);

module.exports = router;