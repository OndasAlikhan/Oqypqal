import React, { Component } from 'react';
import './Cart.css'
class CartElement extends Component {
    render() {
        return <div key={this.props.id} className="cartElement">
            <span>"{this.props.name}" </span><br />
            <span>{this.props.author} </span><br />
            <span>{this.props.genre} </span><br />
            <span>{this.props.price} </span><br />
            <a onClick={() => this.props.onDelete(this.props.id)}>delete</a><br />
        </div>
    }
}

export default CartElement;