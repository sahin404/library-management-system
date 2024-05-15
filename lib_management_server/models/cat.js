const mongoose = require('mongoose');

// Define schema
const bookCategorySchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

// Create model
const BookCategory = mongoose.model('BookCategory', bookCategorySchema);

module.exports = BookCategory;
