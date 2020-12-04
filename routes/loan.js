const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { addLoan, allLoans, deleteLoan } = require('../controllers/loansController');
const { validarCampos } = require('../middlewares/validar-campos')


router.post('/add', [
    check('date_loan', 'El campo date es obligatorio').not().isEmpty(),
    validarCampos
], addLoan);

router.get('/all', allLoans);

router.post('/delete', deleteLoan);

module.exports = router;