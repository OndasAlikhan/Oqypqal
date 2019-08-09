import React, { Component } from 'react';
import { List } from 'antd';
import axios from 'axios';
import { Cookies } from 'react-cookie';
const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'https://foo.api.net/';


class BookList extends Component {

    state = {
        listOfBooks: [],
        listOfBooksStringified: ''
    }
    // componentDidUpdate(prevState) {
    //     if (prevState.listOfBooks !== this.state.listOfBooks) {
    //         let { listOfBooks } = this.state;
    //         this.setState({ listOfBooksStringified: `${listOfBooks.name} ${listOfBooks.author} ${listOfBooks.genre} ${listOfBooks.price} ` })
    //     }
    // }
    componentDidMount() {
        this.getListOfBooks();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.update !== this.props.update)
            this.getListOfBooks();
    }

    getListOfBooks = () => {
        let cookies = new Cookies();
        axios.get(endpoint.concat('/admin-panel/'), { 'headers': { 'x-auth-token': cookies.get('jwt') } })
            .then(res => this.setState({ listOfBooks: res.data.arrayOfBooks }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>List of books</h3>
                <List
                    size='small'
                    bordered
                    dataSource={this.state.listOfBooks}
                    renderItem={item => {
                        console.log(item);
                        return <List.Item>{item.name} {item.author} {item.genre} {item.price}</List.Item>
                    }
                    }
                />
            </div>
        )
    }
}

export default BookList;