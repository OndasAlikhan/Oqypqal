import React, { Component } from 'react';
import './BookList.css';
import axios from 'axios';
class Book extends Component {
    constructor(props) {
        super(props);
        this.bookName = React.createRef();
        this.bookAuth = React.createRef();
        this.bookGenr = React.createRef();
        this.bookPric = React.createRef();
    }

    state = {
        isEditOn: false,  //this boolean is used to switch to Edit mode to edit books properties
    }

    editInfoHolder = {
        bookNameEdited: '',
        bookAuthEdited: '',
        bookGenrEdited: '',
        bookPricEdited: ''
    }

    //saving changed values to editInfoHolder object
    handleEdit() {
        console.log(this.bookName.current.value, 'names current value');   //WORKS          
        if (this.bookName.current.value !== '')
            this.editInfoHolder.bookNameEdited = this.bookName.current.value;
        else this.editInfoHolder.bookNameEdited = this.props.name;

        if (this.bookAuth.current.value !== '')
            this.editInfoHolder.bookAuthEdited = this.bookAuth.current.value;
        else this.editInfoHolder.bookAuthEdited = this.props.author;

        if (this.bookGenr.current.value !== '')
            this.editInfoHolder.bookGenrEdited = this.bookGenr.current.value;
        else this.editInfoHolder.bookGenrEdited = this.props.genre;

        if (this.bookPric.current.value !== '')
            this.editInfoHolder.bookPricEdited = this.bookPric.current.value;
        else this.editInfoHolder.bookPricEdited = this.props.price;

        console.log('State values at the end of the handleEdith', this.state);
    }

    //taking data from editInfoHolder and sending it to server
    handleDoneButton = () => {
        // if (!window.confirm('Confirm changes'))                                 
        //     return;                                                             
        this.handleEdit(); //here setting state

        //data that will be sent to server
        let reqData = {
            id: this.props.id,
            name: this.editInfoHolder.bookNameEdited,
            author: this.editInfoHolder.bookAuthEdited,
            price: this.editInfoHolder.bookPricEdited,
            releaseDate: 0,
            genre: this.editInfoHolder.bookGenrEdited
        }

        console.log(reqData, 'data of edit request');
        axios.post('http://localhost:3001/admin-panel/edit-book', reqData)
            .then((result) => {
                console.log(result, 'response came from edit request');
                this.props.onEdit();
            })
            .catch(err => console.log('Error occured', err));

        this.setState({ isEditOn: false });
    }

    renderEditButtonAction() {
        if (this.state.isEditOn === false) {
            return (
                // default look of book information in admin panel 
                <div className="bookElement">
                    <div>
                        <span ref={this.bookName} className='bookText'>"{this.props.name}" </span>
                        <span ref={this.bookAuth} className='bookText'>{this.props.author} </span>
                        <span ref={this.bookGenr} className='bookText'>{this.props.genre} </span>
                        <span ref={this.bookPric} className='bookText'>{this.props.price}$ </span>
                    </div>
                    <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
                    <button onClick={() => this.setState({ isEditOn: true })}>Edit</button>
                </div>
            );
        } else {
            return (
                //here text information of book is changed to input parametres to change book's information
                <div className="bookElement">
                    <div>
                        <input ref={this.bookName} className='bookText' />
                        <input ref={this.bookAuth} className='bookText' />
                        <input ref={this.bookGenr} className='bookText' />
                        <input ref={this.bookPric} className='bookText' />
                    </div>
                    <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
                    <button onClick={() => this.setState({ isEditOn: false })}>Cancel</button>
                    <button onClick={this.handleDoneButton}>Done</button>
                </div>
            );
        }

    }

    render() {
        return (
            <div>
                {this.renderEditButtonAction()}
            </div>
        );
    }
}

export default Book;