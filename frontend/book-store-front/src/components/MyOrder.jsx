import React, { Component } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import _ from 'lodash';
class MyOrder extends Component {
    state = {
        orderInfo: {},
        books: []
    }

    componentDidMount() {
        this.getMyOrder();
    }
    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth) {
            this.getMyOrder();
        }
    }

    getMyOrder = () => {
        let cookies = new Cookies();
        if (!cookies.get('jwt')) return;
        let headers = {
            'x-auth-token': cookies.get('jwt')
        }
        axios.get('http://localhost:3001/cart', { 'headers': headers })

            .then(res => {
                this.setState({ orderInfo: _.pick(res.data, ['customer', 'status']) });
                this.setState({ books: res.data.books });
                console.log(this.state.orderInfo, 'then');
            })

            .catch(ex => console.log(ex));
    }

    renderOrder = () => {
        if (!this.state.orderInfo.books) {
            console.log(this.state.orderInfo, 'order');
            return;
        }
        else if (this.state.orderInfo.books) {
            this.state.orderInfo.books.map(c => {
                console.log(this.state.orderInfo, 'order info');
                return (
                    <div>
                        {c.name}<br />
                        {c.author}<br />
                        {c.genre}<br />
                        {c.price}<br />
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.books.map(c => {
                    return <div >
                        {c.name} < br />
                        {c.author} < br />
                        {c.genre} < br />
                        {c.price} < br /> <br />
                    </div>
                })}
            </div>
        )
    }
}

export default MyOrder;