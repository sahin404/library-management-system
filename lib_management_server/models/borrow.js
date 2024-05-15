// models/BorrowList.js

const mongoose = require('mongoose');

// Define schema
const BorrowListSchema = new mongoose.Schema({
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
    },
    oldId: {
        type: String,
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    },
    status: {
        type: String,
        default: "pending"
    }
});

// Create model
const BorrowList = mongoose.model('BorrowList', BorrowListSchema);

module.exports = BorrowList;
