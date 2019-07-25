const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// Getting Book model from bookModel.js
const Book = mongoose.models.Book;
const Customer = mongoose.models.Customer;

//function to perform when get request is received
async function getListOfBooks() {
    let find = await Book.find();
    console.log(find);
    return (find);
}




// handle http get request, to retrieve all books from MongoDB and send to client
router.get('/', (req, res) => {
    getListOfBooks()
        .then(result => {
            console.log('Sending data to client');
            res.json({ arrayOfBooks: result });
        })
});

//handle user's request to log in
router.post('/login', async (req, res) => {
    console.log(req.body);

    //checking if req.body is right format
    let { error } = customerModel.validateLogin(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //checking if req.body.login exists in db
    let customer = await Customer.findOne({ login: req.body.login });
    if (!customer) {
        res.status(400).send('Invalid email or password');
        return;
    }

    //checking password
    let validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) res.status(400).send('Invalid email or password');

    const token = customer.generateAuthToken();
    res.send(token);
});
module.exports = router;