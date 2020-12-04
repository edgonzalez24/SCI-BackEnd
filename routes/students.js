const { Router } = require('express');
const router = Router();
const { addStudent, allStudents, updateStudent, deleteStudent, searchStudent } = require('../controllers/studentController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

// This is CRUD Categories

router.post('/add', [
    check('name', 'El campo Name es obligatorio').not().isEmpty(),
    validarCampos
], addStudent);

router.get('/all', allStudents);

router.put('/update/:id', [
    check('name', 'El campo Name es obligatorio').not().isEmpty(),
    validarCampos
], updateStudent);

router.delete('/delete/:id', deleteStudent);

router.get('/search', searchStudent)
module.exports = router;