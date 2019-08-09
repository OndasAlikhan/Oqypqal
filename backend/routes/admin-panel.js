const express = require('express');
const router = express.Router();
const dbDebug = require('debug')('app:db');
const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');

// All the http request handlers in this file 
// are /admin-panel/* childs

// MongoDB book entity(or model) created in bookModel.js
const Book = bookModel.Book;
// access MongoDB and retrieve a list of ALL books
async function getListOfBooks() {
    let find = await Book.find();

    return (find);
}

//function to perform creation of new book and addition of it to MongoDB 
async function createBook(data) {
    console.log(data, 'data that has to be saved');

    //new instance of Book model
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

// function to perform deletion of book by ID
async function deleteBook(data) {
    let result = await Book.deleteOne({ _id: data.idToDelete });
    return result;
}

// function to perform changes to existing Book
// ID is provided to find the book
// all other fields of the request are new data that has to be put into place of old
async function editBook(data) {
    let result = await Book.findById(data.id); //retrieving book by id
    console.log(result, 'book found');
    //changing its fields to new ones

    result.name = data.name;
    result.author = data.author;
    result.price = data.price;
    result.releaseDate = data.releaseDate;
    result.genre = data.genre;

    //saving
    let s = await result.save();
    console.log('saved');
    return s;
}

//  handling http get request
// sending an array of books exctracted from db
router.get("/", (req, res) => {
    getListOfBooks()
        .then((result) => {
            console.log(result);
            res.json({ arrayOfBooks: result })
        });
    dbDebug('The full list of books has been sent to client');
});

// here req should contain JSON object that contains correct data to create book
// Should add here data validation with Joi
router.post("/create-book", (req, res) => {
    //checking req data for entegrity 
    let validationResult = bookModel.validateCreateBookRequest(req.body);
    if (validationResult.error) {
        console.log(validationResult.error);
        res.status(400);
        return;
    }

    createBook(validationResult.value).then((result) => {
        res.json(result);
    })
});

router.post('/delete-book', (req, res) => {
    let validationResult = bookModel.validateDeleteBookRequest(req.body);
    if (validationResult.error) {
        console.log(validationResult.error);
        res.status(400);
        return;
    }

    deleteBook(validationResult.value).then((result) => {
        res.json(result);
    });
});

router.post('/edit-book', (req, res) => {
    let validationResult = bookModel.validateEditBookRequest(req.body);
    if (validationResult.error) {   //if there is error immediately send 400 status and terminate method
        console.log(validationResult.error);
        res.status(400);
        return;
    }
    console.log(req.body, ' req.body');
    console.log(validationResult.value);

    editBook(validationResult.value).then((r) => {
        res.json(r);
    });
});

module.exports = router;



