const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
//"joi-objectid" is a labrary
// that is used to extend Joi to be able to validate MongoDB ObjectId


//creating mongodb model called Order 
//detailed model of Order provides us with some validation performed by mongoose 

//Order model contains Customer and Book
//Order model uses reference method to create relationship
//Order may have more than one Book 
//Order has only 1 Customer 
const Order = mongoose.model('Order', new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        require: true
    },
    books: {
        type: Array(mongoose.Schema.Types.ObjectId),
        ref: 'Book',
        require: true

    },
    status: {
        type: String
    }
}));


// validation function. Uses Joi library
// returns object that has object.value which is original data sent for validation
// and object.error 
// if there's no error object.error === null
function validateOrder(order) {
    Joi.validate({
        customer: Joi.objectId().required(),
        book: Joi.objectId(),
        status: Joi.string().required()
    });
}

exports.validateOrder = validateOrder;
exports.Order = Order;