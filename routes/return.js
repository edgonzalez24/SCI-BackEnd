const { Router } = require('express');
const router = Router();
const { allReturns, addReturn, deleteReturn } = require('../controllers/returnController');


router.get('/all', allReturns);
router.post('/add', addReturn);
router.delete('/delete/:id', deleteReturn);

module.exports = router;