const { Router } = require('express');
const router = Router();
const { allReturns } = require('../controllers/returnController');


router.get('/all', allReturns);

module.exports = router;