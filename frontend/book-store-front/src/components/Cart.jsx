import React, { Component } from 'react';
import './Cart.css'
import CartElement from './CartElement';
class Cart extends Component {
    state = {
        listOfBooks: this.props.listOfBooks
    };

    render() {
        return (
            <div className="cartContainer">

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