const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })
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
    reviews: [reviewSchema],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)