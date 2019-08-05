import React, { Component } from 'react';
import './Cart.css'
import CartElement from './CartElement';
import axios from 'axios';
import _ from 'lodash';
import { Cookies } from 'react-cookie';
class Cart extends Component {
    state = {
        listOfBooks: this.props.listOfBooks
    };

    componentDidMount() {
        console.log(this.props.listOfBooks);
    }

    handleSaveOrder = () => {
        console.log(this.state.listOfBooks);
        let reqData = {
            books: _.map(this.props.listOfBooks, 'id'),
            status: 'Not Confirmed'
        }

        let cookies = new Cookies();
        let jwtCookie = cookies.get('jwt');
        if (!jwtCookie) return;

        let headers = {
            'x-auth-token': jwtCookie
        }

        console.log(jwtCookie, 'my jwt token');

        axios.post('http://localhost:3001/cart', reqData, { "headers": headers })
            .then(res => {
                console.log(res);
            })
            .catch(ex => console.log(ex));
        console.log(this.props.listOfBooks);
    }

    render() {
        return (
            <div className="cartContainer">
                <a className="cartSaveButton" onClick={this.handleSaveOrder}>Save Order</a>
                {this.props.listOfBooks.map(c => {
                    return <CartElement
                        id={c.id}
                        key={c.id}
                        name={c.name}
                        author={c.author}
                        genre={c.genre}
                        price={c.price}
                        onDelete={this.props.onDelete}
                    />
                })
                }
            </div>
        );
    }
}

export default Cart;