const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error occured connecting to db', err));

