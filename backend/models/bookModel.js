const mongoose = require('mongoose');
const Joi = require('joi');

//creating book model in mongodb 
//and creating some validation functions
const Book = mongoose.model('Book', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    author: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    price: {
        type: Number,
        max: 100000,
        required: true
    },
    releaseDate: Date,
    genre: {
        type: String,
        require: true,
        max: 255
    }
}));

function validateBook(book) {
    return Joi.validate(book, {
        name: Joi.string().min(1).max(255),
        author: Joi.string().min(1).max(255),
        price: Joi.number().max(100000),
        releaseDate: Joi.date(),
        genre: Joi.string()
    });
}

function validateDeleteBookRequest(book) {
    return Joi.validate(book, {
        idToDelete: Joi.object().required()
    });
}

exports.Book = Book;
exports.validateBook = validateBook;
exports.validateDeleteBookRequest = validateDeleteBookRequest