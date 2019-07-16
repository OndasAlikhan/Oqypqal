import React, { Component } from 'react';
import './BookList.css';
import axios from 'axios';
class Book extends Component {
    render() {
        return (
            <div className="bookElement">
                {/* <img className='bookImage' src={require("./images.png")} /> */}
                <div>
                    <span >{this.props.name}</span><br />
                    <span >{this.props.author}</span><br />
                    <span >{this.props.genre}</span><br />
                    <span >{this.props.price}</span><br />
                </div>
                <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
                <button>Change</button>
            </div>
        );
    }
}

export default Book;