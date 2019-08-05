import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Authors extends Component {

    componentDidMount() {
        this.getListOfAuthors();
    }

    state = {
        authorsList: [],
        redirect: false,
        authorToSearch: ''
    }

    handleRedirect = () => {
        if (this.state.redirect)
            return <Redirect to={`/books/?author=${this.state.authorToSearch}`} />
    }

    handleAuthorClick = (data) => {
        this.setState({ authorToSearch: data });
        this.setState({ redirect: true });
    }
    getListOfAuthors = () => {
        console.log('aha')
        axios.get('http://localhost:3001/authors')
            .then(res => {
                console.log(res.data, 'data');
                this.setState({ authorsList: res.data })
            })
            .catch(ex => console.error(ex));
    }

    render() {
        return (<div>
            {this.handleRedirect()}
            {
                this.state.authorsList.map(c => {
                    return (
                        <a onClick={() => this.handleAuthorClick(c.author)} key={c.id}>{c.author}<br /></a>
                    )
                })
            }
        </div>);
    }
}

export default Authors;