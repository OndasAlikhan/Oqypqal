//
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const adminpanel = require('./routes/admin');
mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error', err));

const Book = mongoose.model('Book', bookSchema);

app.use('/admin', adminpanel);

app.listen(3000);
