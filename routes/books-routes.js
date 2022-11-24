const express = require('express')
const router = express.Router()
const books = require('../data/books')

router.route('/')
    .get((req, res) => {
        res.json(books)
    })
    .post((req, res) => {
        let temp_book = {
            'id': books[books.length -1 ].id + 1,
            'title': req.body.title,
            'author': req.body.author
        }
        books.push(temp_book)
        res.status(201).send(temp_book)
    })
    .put((req, res)=> {
        res.status(501).send()
    })
    .delete((req, res) => {
        res.send('Delete all books')
    })

router.route('/:id')
    .get((req, res) => {
        console.log(req.params.id)
        let the_book = books.find((book) => book.id == req.params.id)
        res.send(the_book)
    })
    .put((req, res) => {
        let updated = books.map((book) => {
            if(book.id == req.params.id) {
                book.title = req.body.title,
                book.author = req.body.author
            }
            return book
        })
       res.json(updated)
    })
    .delete((req, res) => {
        let remaining = books.filter((book) => book.id != req.params.id)
        res.json(remaining)
    })

module.exports = router