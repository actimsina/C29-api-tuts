const express = require('express')
const path = require('path')
const logger = require('./logger')
const booksRouter = require('./routes/books-routes')

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
    // res.send('Hello world!')
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/books', booksRouter)
// Error handling middleware

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(err.message)
})

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})