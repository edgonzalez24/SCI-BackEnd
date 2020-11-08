const { Router } = require('express');
const router = Router();
const { addBook, allBook, updateBook, deleteBook, detailBook } = require('../controllers/bookController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

// This is CRUD Register Book

router.post('/add', addBook);

router.get('/all', allBook);

router.put('/update/:id', updateBook);

router.delete('/delete/:id', deleteBook);

router.get('/detail', detailBook);

module.exports = router;