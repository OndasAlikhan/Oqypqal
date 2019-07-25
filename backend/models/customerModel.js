const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
//"joi-objectid" is a labrary
// that is used to extend Joi to be able to validate MongoDB ObjectId


//creating mongodb model called Customer 
//detailed model of Customer provides us with some validation performed by mongoose 
//Phone is assumed to be kazakhstan's number and have appropriate length
//Email must be unique to each user
const customerSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    phone: {
        type: String,
        required: true,
        min: 11,
        max: 12
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        max: 255,
        required: true
    }
});

//this method should be used all across the application to genereate tokens
customerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}
const Customer = mongoose.model('Customer', customerSchema);

// using Joi for additional validation of any sent data
// email is checked for right format (example@some.com)  
function validateCustomer(customer) {
    return Joi.validate(customer, {
        login: Joi.string().max(255).min(1).required(),
        phone: Joi.string().max(12).min(11).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    });
}

function validateLogin(customer) {
    return Joi.validate(customer, {
        login: Joi.string().max(255).min(1).required(),
        password: Joi.string().min(5).max(255).required()
    })
}

//exporting Customer Model and functions
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
exports.validateLogin = validateLogin;