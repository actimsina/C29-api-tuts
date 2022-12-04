const express = require('express')
const router = express.Router()
// const books = require('../data/books')
const Book = require('../models/Book')

router.route('/')
    .get((req, res, next) => {
        Book.find()
            .then((books) => {
                res.json(books)
            }).catch(next)
    })
    .post((req, res, next) => {
        let book = { 'title': req.body.title, 'author': req.body.author }
        Book.create(req.body)
            .then((b) => {
                res.status(201).json(b)
            }).catch(next)
    })
    .put((req, res) => {
        res.status(501).send({ 'msg': 'Not implemented' })
    })
    .delete((req, res, next) => {
        Book.deleteMany()
            .then((status) => {
                res.json(status)
            }).catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        console.log(req.params.id)
        Book.findById(req.params.id)
            .then((book) => {
                res.json(book)
            }).catch(next)
    })
    .post((req, res, next) => {
        res.status(501).json({ 'msg': 'Not implemented' })
    })
    .put((req, res, next) => {
        Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((book) => {
                res.json(book)
            }).catch(next)
    })
    .delete((req, res, next) => {
        Book.findByIdAndDelete(req.params.id)
            .then((book) => {
                res.json(book)
            }).catch(next)
    })

module.exports = router