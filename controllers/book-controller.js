const Book = require('../models/Book')

const getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {
            res.json(books)
        }).catch(next)
}

const createBook = (req, res, next) => {
    // let book = { 'title': req.body.title, 'author': req.body.author }
    Book.create(req.body)
        .then((b) => {
            res.status(201).json(b)
        }).catch(next)
}

const deleteAllBooks = (req, res, next) => {
    Book.deleteMany()
        .then((status) => {
            res.json(status)
        }).catch(next)
}

const getBookById = (req, res, next) => {
    console.log(req.params.id)
    Book.findById(req.params.id)
        .then((book) => {
            res.json(book)
        }).catch(next)
}

const updateBookById = (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((book) => {
            res.json(book)
        }).catch(next)
}

const deleteBookById = (req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
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