import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import BookClient from './BookClient';
import './ClientPage.css';
class ClientPage extends Component {

    state = {
        listOfBooks: []
    };

    componentDidMount() {
        this.getListOfBooks();
    }

    //send request to server get list of books and set them to state
    getListOfBooks = () => {
        axios.get('http://localhost:3001/')
            .then((res) => {
                console.log('Req sent, response came');
                this.setState({ listOfBooks: res.data.arrayOfBooks });
            })
            .catch((err) => console.log('Error occured', err));
    }


    render() {
        return (
            <div className='clientPageContainer'>

                {this.state.listOfBooks.map(i => {
                    return (
                        <BookClient
                            key={i._id}
                            id={i._id}
                            name={i.name}
                            author={i.author}
                            genre={i.genre}
                            price={i.price}
                        />
                    )
                })
                }

            </div>
        );
    }
}

export default ClientPage;