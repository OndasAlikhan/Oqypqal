import React, { Component } from 'react';
import WrappedCreateBookForm from './CreateBookForm';
import BookList from './BookList';
import './AdminPanel.css'
class AdminPanel extends Component {
    state = {
        shouldUpdateBookList: false
    }
    handleOnCreateBook = () => {
        console.log('admin panel truesst');
        this.setState({ shouldUpdateBookList: this.state.shouldUpdateBookList ? false : true });
        console.log(this.state.shouldUpdateBookList);
    }

    render() {
        return (
            <div class="admin-panel">
                <WrappedCreateBookForm onCreateBook={this.handleOnCreateBook} />
                <BookList update={this.state.shouldUpdateBookList} />
            </div>
        )
    }
}

export default AdminPanel;