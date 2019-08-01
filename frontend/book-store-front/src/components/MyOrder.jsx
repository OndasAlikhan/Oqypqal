import React, { Component } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
class MyOrder extends Component {
    state = {
        orderInfo: {}
    }

    componentDidMount() {
        this.getMyOrder();
    }

    getMyOrder = () => {
        let cookies = new Cookies();
        if (!cookies.get('jwt')) return;
        let headers = {
            'x-auth-token': cookies.get('jwt')
        }
        axios.get('http://localhost:3001/cart', { 'headers': headers })
            .then(res => { this.setState({ orderInfo: res.data }); console.log(this.state.orderInfo) })
            .catch(ex => console.log(ex));
    }

    renderOrder = () => {
        if (!this.state.orderInfo.books) return;
        else if (this.state.orderInfo.books) {
            this.state.orderInfo.books.map(c => {
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

            </div>
        )
    }
}

export default MyOrder;