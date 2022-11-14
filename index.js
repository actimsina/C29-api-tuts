const express = require('express')
const logger = require('./logger')

const app = express()

app.use((req, res, next) => {
    logger.log(req.path)
    next()
})

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})