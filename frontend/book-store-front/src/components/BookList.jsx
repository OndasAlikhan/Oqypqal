import React, { Component } from 'react';
import './BookList.css';
import axios from 'axios';
import Book from './Book.jsx';
class BookList extends Component {
    state = {
        listOfBooks: [],
        name: '',
        author: '',
        genre: '',
        price: 0,
        nameToDelete: ''
    }

    componentDidMount() {
        this.getListOfBooks();
    }

    // here we request a json of list of books from server
    getListOfBooks() {
        axios.get('http://localhost:3001/admin-panel')
            .then(res => {
                console.log(res, "res");
                this.setState({ listOfBooks: res.data.arrayOfBooks });
            })
            .catch(err => console.log("error", err));

    }

    handleNameInput = (event) => {
        this.setState({ name: event.target.value });
    }

    handleAuthInput = (event) => {
        this.setState({ author: event.target.value });
    }

    handleGenrInput = (event) => {
        this.setState({ genre: event.target.value });
    }

    handlePricInput = (event) => {
        this.setState({ price: event.target.value });
    }


    handleBookDeleteButton = (id) => {
        //first delete that component from state
        //second delete it from db

        //slice that element out by id from array of books in state
        for (let i = 0; i < this.state.listOfBooks.length; i++) {
            if (this.state.listOfBooks[i]._id === id) {
                this.state.listOfBooks.slice(i, 1);
            }

        }

        //the reqdata to be sent to server
        //contains reqMessage to know what to do with it and id
        let reqData = {
            idToDelete: id
        }
        axios.post('http://localhost:3001/admin-panel/delete-book', reqData)
            .then((res) => {
                console.log('Book deletion successful', res);
                console.log('this is state', this.state.listOfBooks);
                this.getListOfBooks();

            })
            .catch(err => console.log('Error occured', err));

    }
    createBookRequest = () => {
        let reqData = {
            name: this.state.name,
            author: this.state.author,
            genre: this.state.genre,
            price: this.state.price,
            releaseDate: 0
        }

        console.log(reqData, 'this is reqData from create book');
        axios.post('http://localhost:3001/admin-panel/create-book', reqData)
            .then(res => {
                console.log(res, 'res the book has been created');
                this.getListOfBooks();

            })
            .catch(err => console.log('Error occured', err));

    }

    // don't need this fakin thing
    deleteBookRequest = () => {
        let reqData = {
            nameToDelete: this.state.nameToDelete
        }
        axios.delete('http://localhost:3001/admin-panel/delete-book', reqData)
            .then()(res => {
                console.log(res, 'Book has been deleted');
            })
            .catch(err => console.log('Error occured', err));
    }


    //figure out design for booklist for admin pannel and add buttons to delete and create books 

    render() {
        return (
            <div className="booklist">
                <div className="createlistcontainer">

                    <ul className="newBook">
                        <span className='words'>Create a new book</span>
                        <li className='words'> Name   <input id="nameinp" onChange={this.handleNameInput} type='text'></input></li>

                        <li className='words'> Author <input id="authinp" onChange={this.handleAuthInput} type='text'></input></li>

                        <li className='words'> Genre  <input id="genrinp" onChange={this.handleGenrInput} type='text'></input></li>

                        <li className='words'> Price  <input id="pricinp" onChange={this.handlePricInput} type='text'></input></li>
                    </ul>
                    <button id="createBookBtn" onClick={this.createBookRequest} href="s">Submit</button>
                </div>


                <div className="listcontainer">
                    {this.state.listOfBooks.map(c => {
                        return (
                            <Book
                                key={c._id}
                                id={c._id}
                                name={c.name}
                                author={c.author}
                                genre={c.genre}
                                price={c.price}
                                onDelete={this.handleBookDeleteButton}
                            />
                        );
                    })}
                </div>

            </div>
        );
    }
}

export default BookList;