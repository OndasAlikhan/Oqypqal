import React, { Component } from 'react';
import './BookList.css'
import axios from 'axios';
class BookList extends Component {
    state = {
        listOfBooks: ['a', 'b']
    }

    // here we request a json from server
    getListOfBooks() {
        axios.get('localhost:3001/admin-panel/')
            .then(res => {
                console.log(res);
                this.setState({ listOfBooks: res.data });
            })
            .catch(err => console.log("error", err));
        return (
            <span>{this.state.listOfBooks}</span>
        );
    }

    render() {
        return (
            <div className="booklist">
                <div className="createlistcontainer">
                    <ul className="newBook">
                        <span className='words'>Create a new book</span>
                        <li className='words'> Name   <input id="nameinp" type='text'></input></li>

                        <li className='words'> Author <input id="authinp" type='text'></input></li>

                        <li className='words'> Genre  <input id="genrinp" type='text'></input></li>

                        <li className='words'> Price  <input id="pricinp" type='text'></input></li>
                    </ul>
                    <button id="createBookBtn" href="s">Submit</button>
                </div>

                <div className="listcontainer">
                    {this.getListOfBooks()}
                </div>

            </div>
        );
    }
}

export default BookList;