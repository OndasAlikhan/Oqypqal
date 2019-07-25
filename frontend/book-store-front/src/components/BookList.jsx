import React, { Component } from 'react';
import './BookList.css';
import axios from 'axios';
import Book from './Book.jsx';
class BookList extends Component {
    constructor(props) {
        super(props);
        this.nameinp = React.createRef();
        this.authinp = React.createRef();
        this.genrinp = React.createRef();
        this.pricinp = React.createRef();
    }

    state = {
        listOfBooks: [],
        name: '',
        author: '',
        genre: '',
        price: 0,
        id: ''
    }

    componentDidMount() {
        this.getListOfBooks();
    }

    // here we request a json of list of books from server
    getListOfBooks = () => {
        console.log('get list of books is called')
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
        //check for users confitmation
        if (!window.confirm('Confirm deletion')) {
            return;
        }

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
        //
        if (this.nameinp.current.value === '' ||
            this.authinp.current.value === '' ||
            this.genrinp.current.value === '' ||
            this.pricinp.current.value === '') {

            return false;
        }

        if ((this.nameinp.current.value.length > 35 || this.nameinp.current.value.length < 1) ||
            (this.authinp.current.value.length > 35 || this.authinp.current.value.length < 1) ||
            (this.genrinp.current.value.length > 35 || this.genrinp.current.value.length < 1) ||
            (this.pricinp.current.value.length > 6 || this.pricinp.current.value.length < 1)) {
            return;
        }

        this.nameinp.current.value = '';
        this.authinp.current.value = '';
        this.genrinp.current.value = '';
        this.pricinp.current.value = '';

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
            id: this.state.id
        }
        axios.delete('http://localhost:3001/admin-panel/delete-book', reqData)
            .then()(res => {
                console.log(res, 'Book has been deleted');
            })
            .catch(err => console.log('Error occured', err));
    }



    render() {
        return (
            <div className="booklist">
                <div className="form">
                    <p className='label'>Create a new book</p>
                    <ul className='inputBox'>
                        <li><span>name  </span> <input ref={this.nameinp} id="nameinp" onChange={this.handleNameInput} type='text' /></  li>
                        <li><span>author</span> <input ref={this.authinp} id="authinp" onChange={this.handleAuthInput} type='text' /></  li>
                        <li><span>genre </span> <input ref={this.genrinp} id="genrinp" onChange={this.handleGenrInput} type='text' /></  li>
                        <li><span>price </span> <input ref={this.pricinp} id="pricinp" onChange={this.handlePricInput} type='text' /></  li>
                        <input className='btn' name='' value='submit' onClick={this.createBookRequest} type='submit' />
                    </ul>
                </div>


                <div className="listcontainer">
                    <span className='listLabel'>Books</span>
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
                                onEdit={this.getListOfBooks}
                            />
                        );
                    })}
                </div>

            </div>
        );
    }
}

export default BookList;