const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)