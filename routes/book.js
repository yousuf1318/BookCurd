const express = require('express');
const { bookController } = require('../controllers');
const router = express.Router();
const authGuard = require('../middlewares/AuthGurd');


router.post('/',authGuard, bookController.createBook)
router.get('/',authGuard, bookController.getBook)
router.patch('/update', authGuard,bookController.updateBook);
router.delete('/delete',authGuard, bookController.deleteBook);

module.exports = router;