const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error occured connecting to db', err));

const Order = mongoose.model('Order', new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        require: true
    },
    book: {
        type: Array(mongoose.Schema.Types.ObjectId),
        ref: 'Book',
        require: true

    },
    status: {
        type: String
    }


}));
async function a() {
    let newOrder = new Order({
        customer: '5d3551cb55345c0a74bffc19',
        book: ['5d2ec4170297d02560550395', '5d2ec4320297d02560550396'],
        status: '@someStatus',
        date: 'today    '
    });

    await newOrder.save();
}

a();