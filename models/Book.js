const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
// One-to-Few is most suitable for embedding!
const bookSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reviews: [reviewSchema]
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)