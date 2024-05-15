// models/book.js

const mongoose = require('mongoose');

// Define schema
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    writter: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Create model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
