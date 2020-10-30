const { Router } = require('express');
const router = Router();
const { searchBook } = require('../controllers/searchController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', searchBook);

module.exports = router;