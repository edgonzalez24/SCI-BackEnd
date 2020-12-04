const { Router } = require('express');
const router = Router();
const { addBook, allBook, updateBook, deleteBook, detailBook, newBooks, searchBook } = require('../controllers/bookController');
// This is CRUD Register Book

router.post('/add', addBook);

router.get('/all', allBook);

router.put('/update/:id', updateBook);

router.delete('/delete/:id', deleteBook);

router.get('/detail', detailBook);

router.get('/news', newBooks);

router.get('/search', searchBook)

module.exports = router;