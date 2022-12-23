const Book = require('../models/Book')

const getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {
            res.json(books)
        }).catch(next)
}

const createBook = (req, res, next) => {
    let book = {
        title: req.body.title,
        author: req.body.author,
        owner: req.user.id
    }
    Book.create(book)
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
    Book.findById(req.params.book_id)
        .then(book => {
            if (book.owner != req.user.id) {
                res.status(403)
                return next(new Error('Not allowed'))
            }
            book.author = req.body.author ? req.body.author : book.author
            book.title = req.body.title ? req.body.title : book.title
            book.category = req.body.category ? req.body.category : book.category
            book.save().then(book => res.json(book)).catch(next)
        }).catch(next)

    // Book.findByIdAndUpdate(req.params.book_id, { $set: req.body }, { new: true })
    //     .then((book) => {
    //         res.json(book)
    //     }).catch(next)
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