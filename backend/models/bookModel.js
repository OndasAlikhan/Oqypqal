const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
//"joi-objectid" is a labrary
// that is used to extend Joi to be able to validate MongoDB ObjectId


//creating Book model in mongodb 
//detailed model of Book provides us with some validation performed by mongoose 
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

//Next 3 functions are from Joi library and are used for additional
//validation

//in Edit requests ID is sent by client
//we need validate that request considering provided ID
function validateEditBookRequest(book) {
    return Joi.validate(book, {
        id: Joi.objectId(),
        name: Joi.string().min(1).max(255),
        author: Joi.string().min(1).max(255),
        price: Joi.number().max(100000),
        releaseDate: Joi.date(),
        genre: Joi.string()
    });
}

//in Create requests ID is not sent because that information is 
// not added to MongoDB
// ID will assigned by mongoose when saving to MongoDB
function validateCreateBookRequest(book) {
    return Joi.validate(book, {

        name: Joi.string().min(1).max(255),
        author: Joi.string().min(1).max(255),
        price: Joi.number().max(100000),
        releaseDate: Joi.date(),
        genre: Joi.string()
    });
}

//in Delete request only ID is provided 
//because no additional information needed for deleting
function validateDeleteBookRequest(book) {
    return Joi.validate(book, {
        idToDelete: Joi.objectId().required()
    });
}

//exporting Book Model and functions
exports.Book = Book;
exports.validateEditBookRequest = validateEditBookRequest;
exports.validateDeleteBookRequest = validateDeleteBookRequest;
exports.validateCreateBookRequest = validateCreateBookRequest;