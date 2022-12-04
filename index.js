require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('./logger')
const booksRouter = require('./routes/books-routes')

const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => console.log(err))

const app = express()

app.use((req, res, next) => {
    logger.log(`${req.method}\t${req.headers.origin}\t${req.path}`)
    console.log(`${req.method} ${req.path}`)
    next()
})


// To accept form data
app.use(express.urlencoded({ extended: false }))

// To accept json data
app.use(express.json())

// To serve static files
app.use(express.static(path.join(__dirname, 'public')))



app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/books', booksRouter)
// Error handling middleware

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({ 'err': err.message })
})

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`)
    })
})
