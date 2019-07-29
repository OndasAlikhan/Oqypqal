import React, { Component } from 'react';
import './BookClient.css';
import axios from 'axios';
class BookClient extends Component {
    handleAddToCart = () => {
        let temp = {
            id: this.props.id,
            name: this.props.name,
            author: this.props.author,
            price: this.props.price,
        }

        return temp;
    }

    render() {
        return (
            <div className="bookElementClient">
                <img className='bookImage' src={require("./images.png")} />
                <div className='text'>
                    <span >{this.props.name}</span><br />
                    <span >{this.props.author}</span><br />
                    <span >{this.props.price}</span><br />

                </div>
                {/* <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
                <button>Change</button> */}
                <a className="bookClientButton" onClick={() => this.props.onAddToCart(this.handleAddToCart())}>Add To Cart</a>
            </div >
        );
    }
}

export default BookClient;