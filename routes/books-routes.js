const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book-controller')
const reviewController = require('../controllers/review-controller')
const { verifyUser, verifyManager, verifyAdmin } = require('../middleware/auth')


router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(bookController.deleteAllBooks)

router.route('/:book_id')
    .get(bookController.getBookById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(bookController.updateBookById)
    .delete(bookController.deleteBookById)

router.route('/:book_id/reviews')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(verifyAdmin, reviewController.deleteAllReviews)

router.route('/:book_id/reviews/:review_id')
    .get(reviewController.getReviewById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(reviewController.updateReviewById)
    .delete(reviewController.deleteReviewById)

module.exports = router