const Book = require('../models/Book')

const getAllReviews = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            res.json(book.reviews)
        }).catch(next)
}

const createReview = (req, res, next) => {
    data = {
        body: req.body.body,
        reviewer: req.user.id
    }
    Book.findById(req.params.book_id)
        .then((book) => {
            book.reviews.push(data)
            book.save().then(book => res.status(201).json(book.reviews)).catch(next)
        }).catch(next)
}

const deleteAllReviews = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            book.reviews = []
            book.save().then((book) => res.json(book))
        }).catch(next)
}

const getReviewById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            let review = book.reviews.find(review => review.id === req.params.review_id)
            if (review) res.json(review)
            else res.json({ 'msg': 'Respective review not found' })
        }).catch(next)
}

const updateReviewById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            let review = book.reviews.id(req.params.review_id)
            if (review == null) {
                res.status(404)
                return next(new Error('Not found'))
            }
            if (review.reviewer != req.user.id) {
                res.status(403)
                return next(new Error('Not authorized'))
            }
            review.body = req.body.body
            book.save().then(book => res.json(book.reviews)).catch(next)
        }).catch(next)
}

const deleteReviewById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            let review = book.reviews.id(req.params.review_id)
            if (review == null) {
                res.status(404)
                return next(new Error('Not found'))
            }
            if (review.reviewer != req.user.id) {
                res.status(403)
                return next(new Error('Not authorized'))
            }
            book.reviews = book.reviews.filter(review => review.id !== req.params.review_id)
            book.save().then(book => res.json(book.reviews)).catch(next)
        }).catch(next)
}
module.exports = {
    getAllReviews,
    createReview,
    deleteAllReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById
}