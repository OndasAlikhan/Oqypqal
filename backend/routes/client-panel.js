const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/oqypqal')
//     .then(() => console.log('Connected to db...'))
//     .catch((err) => console.log('Error occured', err));


// const bookShema = new mongoose.Schema({
//     name: String,
//     author: String,
//     price: Number,
//     releaseDate: Date,
//     genre: String
// });

// const Book = mongoose.model('Book', bookShema);

// get list from db in json format and return it

console.log(mongoose.models);
const Book = mongoose.models.Book;
async function getListOfBooks() {
    let find = await Book.find();
    console.log(find);
    return (find);
}

router.get('/', (req, res) => {
    getListOfBooks()
        .then(result => {
            console.log('Sending data to client');
            res.json({ arrayOfBooks: result });
        })
});

module.exports = router;