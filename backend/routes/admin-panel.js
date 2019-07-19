const express = require('express');
const router = express.Router();
const dbDebug = require('debug')('app:db');
const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');

mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error', err));



const Book = mongoose.models.Book;
// get list from db in json format
async function getListOfBooks() {
    let find = await Book.find();

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

async function editBook(data) {
    let result = await Book.find({ _id: data.id });
    console.log(result);
    result = result[0];
    result.name = data.name;
    result.author = data.author;
    result.price = data.price;
    result.releaseDate = data.releaseDate;
    result.genre = data.genre;
    console.log(result);

    await result.save();
    console.log('saved')
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
    //checking req data for entegrity 
    let validationResult = bookModel.validateBook(req.body);
    if (validationResult.error) {
        res.status(400);
        return;
    }

    createBook(validationResult.value).then((result) => {
        res.json(result);
    })
});

router.post('/delete-book', (req, res) => {
    // let validationResult = bookModel.validateDeleteBookRequest(req.body);
    // if (validationResult.error) {
    if (req.body) {
        res.status(400);
        return;
    }

    deleteBook(validationResult.value).then((result) => {
        res.json(result);
    });
});

router.post('/edit-book', (req, res) => {
    let validationResult = bookModel.validateBook(req.body);
    if (validationResult.error) {   //if there is error immediately send 400 status and terminate method
        res.status(400);
        return;
    }
    // console.log(req, ' req.data');
    editBook(validationResult.value).then((result) => {
        res.json(result);
    });
});

module.exports = router;



