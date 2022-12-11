const Book = require('../models/Book')

// const links = [
//     { rel: 'self', method: 'get', href: '/books' },
//     { rel: 'create', method: 'post', href: '/books' },
//     { rel: 'delete', method: 'delete', href: '/books' }
// ]

const getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {
            res.json(books)
        }).catch(next)
}

const createBook = (req, res, next) => {
    // let book = { 'title': req.body.title, 'author': req.body.author }
    Book.create(req.body)
        .then((book) => {
            res.status(201).json(book)
        }).catch(next)
}

const deleteAllBooks = (req, res, next) => {
    Book.deleteMany()
        .then((status) => {
            res.json(status)
        }).catch(next)
}

const getBookById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .populate('category')
        .then((book) => {
            res.json(book)
        }).catch(next)
}

const updateBookById = (req, res, next) => {
    Book.findByIdAndUpdate(req.params.book_id, { $set: req.body }, { new: true })
        .then((book) => {
            res.json(book)
        }).catch(next)
}

const deleteBookById = (req, res, next) => {
    Book.findByIdAndDelete(req.params.book_id)
        .then((book) => {
            res.json(book)
        }).catch(next)
}

module.exports = {
    getAllBooks,
    createBook,
    deleteAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}