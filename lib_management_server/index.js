const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const stripe = require('stripe')('sk_test_51OF1GOHUw9AEQwQEvRlzEAUHSGAOeBfwquYTk5W0Z2N0syCZ31WYnu3BeB0StuCuiBP5WBdIh4lqAWbPQZSmcgv4009tnwiwQR')
const multer = require("multer");
const UPLOAD_FOLDER = "./public/image";
const fs = require("fs");
const path = require("path");
app.use(express.static('public'));

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const BookCategory = require('./models/cat');
const Book = require('./models/book');
const BorrowList = require('./models/borrow');

console.log(process.env.SECRET_KEYS_API_SK);
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        if (file) {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();
            console.log("🚀 ~ fileName:", fileName);
            cb(null, fileName + fileExt);
        }
    },
});

var upload = multer({
    storage: storage,
});

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Book.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { writter: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(results);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/borrowed-books', async (req, res) => {
    try {
        const borrowedBooks = await BorrowList.find({ status: 'approved' });
        res.json(borrowedBooks);
    } catch (error) {
        console.error('Error retrieving borrowed books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/books-back-request', async (req, res) => {
    try {
        const booksBackRequest = await BorrowList.find({ status: 'back-request' });

        if (!booksBackRequest || booksBackRequest.length === 0) {
            return res.status(404).json({ message: 'No books with status back-request found.' });
        }

        // If books are found, return them
        res.status(200).json(booksBackRequest);
    } catch (error) {
        console.error('Error fetching books with status back-request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/api/search-category', async (req, res) => {
    const query = req.query.q;
    try {
        const results = await BookCategory.find({
            $or: [
                { bookName: { $regex: query, $options: 'i' } },
                { shortDesc: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(results);
    } catch (error) {
        console.error('Error searching book categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/add-category', upload.single('image'), async (req, res) => {
    try {
        const { bookName, shortDesc } = req.body;
        console.log(bookName, shortDesc);
        const image = req.file.filename; // Get the path of the uploaded image

        // Create a new book category instance
        const newBookCategory = new BookCategory({
            bookName,
            shortDesc,
            image
        });
        const savedBookCategory = await newBookCategory.save();
        res.status(201).json(savedBookCategory);
    } catch (err) {
        console.error('Error creating book category:', err);
        res.status(500).json({ error: 'Error creating book category' });
    }
})

app.post('/add-book', upload.single('image'), async (req, res) => {
    try {
        console.log('hit-route');
        const { name, writter, date, quantity, category, description } = req.body;

        console.log(name, writter, date, quantity, category, description);

        // Create a new book instance
        const newBook = new Book({
            name,
            image: req.file.filename,
            writter,
            date,
            quantity,
            category,
            description
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).json({ error: 'Error adding book' });
    }
})

app.get('/categories', async (req, res) => {
    const result = await BookCategory.find();
    res.json(result);
})

app.get('/books', async (req, res) => {
    const result = await Book.find();
    res.json(result);
})

app.get('/book-by-cat', async (req, res) => {
    const bookName = req.query.name;
    console.log(bookName);
    const result = await Book.find({ category: bookName });
    res.json(result);
})

app.post('/borrow', async (req, res) => {
    try {
        console.log('hit-route');
        const { _id, name, writter, image, date, quantity, category, description, email, userName } = req.body;

        console.log(name, writter, date, quantity, category, description);

        // Create a new book instance
        const newBook = new BorrowList({
            name,
            image,
            writter,
            date,
            quantity,
            category,
            description,
            userName,
            email,
            oldId: _id,
            status: 'borrow-request'
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).json({ error: 'Error adding book' });
    }
})

app.get('/borrow-list/:email', async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email, 'hit this route');
        const borrowlist = await BorrowList.find({ email, status: 'borrow-request' });
        res.status(200).json(borrowlist);
    } catch (err) {
        console.error('Error fetching borrower\'s book list:', err);
        res.status(500).json({ error: 'Error fetching borrower\'s book list' });
    }
});

app.get('/borrowed-list/:email', async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email);
        const borrowlist = await BorrowList.find({ email, status: 'approved' });
        res.json(borrowlist);
    } catch (err) {
        console.error('Error fetching borrower\'s book list:', err);
        res.status(500).json({ error: 'Error fetching borrower\'s book list' });
    }
});

app.get('/borrow-list', async (req, res) => {
    try {
        const borrowlist = await BorrowList.find();
        res.status(200).json(borrowlist);
    } catch (err) {
        console.error('Error fetching borrower\'s book list:', err);
        res.status(500).json({ error: 'Error fetching borrower\'s book list' });
    }
});

app.put('/borrow-list/:id', async (req, res) => { // Endpoint URL is '/borrow-list/:id'
    const requestId = req.params.id;
    try {
        const borrowRequest = await BorrowList.findById(requestId);
        if (!borrowRequest) {
            return res.status(404).json({ message: 'Borrow request not found.' });
        }
        borrowRequest.status = 'back-request';
        await borrowRequest.save();
        res.status(200).json({ message: 'Borrow request updated successfully.' });
    } catch (error) {
        console.error('Error updating borrow request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.put('/borrow-approve-list/:id', async (req, res) => {
    const requestId = req.params.id;
    const { status } = req.body;

    console.log(status, 'approved');

    try {
        const borrowRequest = await BorrowList.findById(requestId);
        if (!borrowRequest) {
            return res.status(404).json({ message: 'Borrow request not found.' });
        }
        borrowRequest.status = status;

        if (status === 'approved') {
            borrowRequest.quantity -= 1;
        }

        await borrowRequest.save();
        res.status(200).json({ message: 'Borrow request updated successfully.' });
    } catch (error) {
        console.error('Error updating borrow request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.delete('/borrowed-list/:id', async (req, res) => {
    const requestId = req.params.id;

    try {
        const borrowItem = await BorrowList.findByIdAndDelete(requestId);
        res.status(200).json({ message: 'Borrowed item returned successfully.' });
    } catch (error) {
        console.error('Error returning borrowed item:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// last step delete
app.delete('/borrow-list/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        await BorrowList.findByIdAndDelete(requestId);
        res.status(200).json({ message: 'Borrow request deleted successfully.' });
    } catch (error) {
        console.error('Error deleting borrow request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.delete('/back-list/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        await BorrowList.findByIdAndDelete(requestId);
        res.status(200).json({ message: 'Borrow request deleted successfully.' });
    } catch (error) {
        console.error('Error deleting borrow request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.delete('/book-delete/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        await Book.findByIdAndDelete(requestId);
        res.status(200).json({ message: 'Borrow request deleted successfully.' });
    } catch (error) {
        console.error('Error deleting borrow request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.delete('/cat-delete/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        await BookCategory.findByIdAndDelete(requestId);
        res.status(200).json({ message: 'Borrow request deleted successfully.' });
    } catch (error) {
        console.error('Error deleting borrow request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


const connecting = () => {
    const uri = `mongodb+srv://LIB_MANAGEMENT:NFjVO21T3dmYHhgP@sahin.bllefho.mongodb.net/?retryWrites=true&w=majority&appName=Sahin`;
    return uri;
}

const connectDB = async () => {
    console.log('testing.....');
    const test = connecting();
    await mongoose.connect(test, { dbName: 'LIB_MANAGEMENT' })
    console.log('connected to DB');
}

const final = async () => {
    await connectDB()
    app.listen(5000, () => {
        console.log(`Server is running on port 5000`);
    });
}

final()