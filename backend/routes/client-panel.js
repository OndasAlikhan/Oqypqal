const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/oqypqal')
    .then(() => console.log('Connected to db...'))
    .catch((err) => console.log('Error occured', err));


const bookShema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    releaseDate: Date,
    genre: String
});

const Book = mongoose.model('Book', bookShema);

router.get('/', (req, res) => {
    Book.find();
});

