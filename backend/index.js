//
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error', err));

const Course = mongoose.model('Course', bookSchema);

async function getListOfCourses() {
    return Course.find();
}
app.get("/admin", (req, res) => {


});


const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    releaseDate: Date,
    genre: String
});

