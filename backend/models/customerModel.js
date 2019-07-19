const mongoose = require('mongoose');
const Joi = require('joi');

//creating mongodb model called customer 
//creating some validation functions
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
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
        max: 255
    }
}));

