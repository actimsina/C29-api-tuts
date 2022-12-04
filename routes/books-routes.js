const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book-controller')
// const books = require('../data/books')


router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(bookController.deleteAllBooks)

router.route('/:id')
    .get(bookController.getBookById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(bookController.updateBookById)
    .delete(bookController.deleteBookById)

module.exports = router