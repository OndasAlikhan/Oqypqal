const express = require('express');
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');
const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
//MongoDB customer entity(or model) created in customerModel.js
const Customer = mongoose.models.Customer;

//function to perform if request passed validation
async function createCustomer(data) {
    console.log(data);

    // new instance of Customer model
    let customer = new Customer({
        login: data.login,
        email: data.email,
        phone: data.phone,
        password: data.password
    });

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save();
    console.log('New user created');
    return customer;
}

// router to handle the request
// we are using validation function that we defined in customerModel.js
router.post('/create-user', async (req, res) => {
    let validRes = customerModel.validateCustomer(req.body);
    if (validRes.error) {
        return res.status(400).send(validRes.error);
    }
    console.log('checked for format');
    //checking if user already exists
    let foundCust = await Customer.findOne({ email: req.body.email });
    if (foundCust) {
        return res.status(400).send("User already registered");
    }
    createCustomer(validRes.value)
        .then(customer => {
            const token = customer.generateAuthToken();
            console.log('Token created');
            res.header('x-auth-token', token).send(_.pick(customer, ['login', 'email', 'phone']));
            console.log('response sent');

        })
        .catch((err) => console.log(err, 'Error occured'));
});

module.exports = router;