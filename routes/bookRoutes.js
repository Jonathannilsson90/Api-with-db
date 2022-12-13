const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookControllers')

router.get('/', controller.getAllBooks)
router.get('/:bookId', controller.getBookById)
router.post('/', controller.createBook)
router.delete('/:bookId', controller.deleteBook)
router.patch('/:bookId', controller.updateBook)

module.exports = router;