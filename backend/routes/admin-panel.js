const express = require('express');
const router = express.Router();
const dbDebug = require('debug')('app:db');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error', err));


const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    releaseDate: Date,
    genre: String
});
const Book = mongoose.model('Book', bookSchema);

// get list from db in json format
async function getListOfBooks() {
    let find = await Book.find();
    console.log(find);
    return (find);
}

async function createBook(data) {
    console.log(data, 'data that has to be saved');
    let book = new Book({
        name: data.name,
        author: data.author,
        price: data.price,
        releaseDate: data.releaseDate,
        genre: data.genre
    });

    const res = await book.save();
    console.log('New book is saved');
    return res;
}

async function deleteBook(data) {
    let result = await Book.deleteOne({ _id: data.idToDelete });
    return result;
}


//Sending an array of books exctracted from db
router.get("/", (req, res) => {
    getListOfBooks()
        .then((result) => res.json({ arrayOfBooks: result }));
    dbDebug('The full list of books has been sent to client');
});

// here req should contain JSON object that contains correct data to create book
// Should add here data validation with Joi
router.post("/create-book", (req, res) => {
    createBook(req.body)
        .then((result) => {
            console.log(result);
            res.json(result);
        })
});

router.post('/delete-book', (req, res) => {
    deleteBook(req.body).then((result) => {
        res.json(result);
    });
});



module.exports = router;



