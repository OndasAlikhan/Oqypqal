import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import BookClient from './BookClient';
import './ClientPage.css';
import Cart from './Cart';
import { Cookies } from 'react-cookie';
const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'https://foo.api.net/';


class ClientPage extends Component {

    state = {
        listOfBooks: [],
        cartBooks: []

    };

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.getListOfBooks();
        }
    }
    componentDidMount() {
        this.getListOfBooks();
        this.getCartBooks();
    }

    //send request to server get list of books and set them to state
    getListOfBooks = () => {
        let uri = endpoint;
        axios.get(uri.concat(`${this.props.location.search}`))
            .then((res) => {
                console.log('Req sent, response came');
                this.setState({ listOfBooks: res.data.arrayOfBooks });
            })
            .catch((err) => console.log('Error occured', err));
    }

    getCartBooks = () => {
        let cookie = new Cookies();

        if (cookie.get('jwt')) {
            let headers = {
                'x-auth-token': cookie.get('jwt')
            }
            axios.get(`${endpoint}/cart`, { 'headers': headers })
                .then(res => {
                    this.setState({ cartBooks: res.data.books })
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        }
        else return;
    }

    handleAddToCart = (data) => {
        let temp = [...this.state.cartBooks];
        console.log(data);

        console.log(temp);

        //search to find if the book already exists
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === data.id)
                return;
        }


        temp.push(data);
        this.setState({ cartBooks: [...temp] });
    }

    handleDelete = (id) => {
        console.log('CART', this.state.cartBooks);
        let cartUpdated = [...this.state.cartBooks];
        for (let i = 0; i < cartUpdated.length; i++) {
            if (cartUpdated[i].id === id) {
                cartUpdated.splice(i, 1);
            }
        }
        this.setState({ cartBooks: cartUpdated });
        console.log('CARTTT', this.state.cartBooks);

    }

    render() {
        return (
            <div className="clientPageContainer" >
                <div className='clientPageBooksContainer'>
                    {this.state.listOfBooks.map(i => {
                        return (
                            <BookClient
                                key={i._id}
                                id={i._id}
                                name={i.name}
                                author={i.author}
                                genre={i.genre}
                                price={i.price}
                                onAddToCart={this.handleAddToCart}
                            />
                        )
                    })
                    }
                </div>
                <Cart
                    listOfBooks={this.state.cartBooks}
                    onDelete={this.handleDelete}
                />
            </div >
        );
    }
}

export default ClientPage;