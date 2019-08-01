const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const customerModel = require('../models/customerModel');
const orderModel = require('../models/orderModel');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const _ = require('lodash');
// Getting Book model from bookModel.js
const Book = mongoose.models.Book;
const Customer = mongoose.models.Customer;
const Order = mongoose.models.Order;

//function to perform when get request is received
async function getListOfBooks() {
    let find = await Book.find();
    console.log(find);
    return (find);
}

// handle http get request, to retrieve all books from MongoDB and send to client
router.get('/', (req, res, next) => {
    getListOfBooks()
        .then(result => {
            console.log('Sending data to client');
            res.json({ arrayOfBooks: result });
        })
        .catch(ex => next(ex)); //passing exception to next
});

// creates new order
router.post('/cart', auth, async (req, res, next) => {
    console.log(req.user._id);
    console.log(req.body.books);
    const order = new Order({
        customer: req.user._id,
        books: req.body.books,
        status: req.body.status

    })
    let result = await order.save();
    res.send(result);
    console.log('New cart request');
});

router.get('/me', auth, async (req, res, next) => {
    let cust = await Customer.findById(req.user);

    res.send(_.pick(cust, ['login', 'email', 'phone']));
});

// retrieves existing cart to client
router.get('/cart', auth, async (req, res, next) => {
    let order = await Order.findOne({ customer: req.user });
    console.log(order);
    if (!order) return res.status(400).send('Bad request');

    let books = [];
    for (i in order.books) {
        books.push(await Book.findById(order.books[i]))
    }

    let resData = {
        customer: order.customer,
        books: books,
        status: order.status
    }
    res.send(resData);

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

    console.log('passed login validation');
    //checking if req.body.login exists in db
    let customer = await Customer.findOne({ login: req.body.login });
    if (!customer) {
        res.status(400).send('Invalid email or password');
        return;
    }

    console.log('found customer in db')
    //checking password
    let validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) res.status(400).send('Invalid email or password');

    console.log('passed password validations');
    //setting token to header
    const token = customer.generateAuthToken();

    res.header("x-auth-token", token);
    console.log('TOKEN CREATED', token);
    res.send({
        email: customer.email,
        phone: customer.phone,
        login: customer.login
    });
});

module.exports = router;