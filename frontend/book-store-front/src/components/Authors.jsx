import React, { Component } from 'react';
import axios from 'axios';

class Authors extends Component {

    componentDidMount() {
        this.getListOfAuthors();
    }

    state = {
        authorsList: []
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
            {
                this.state.authorsList.map(c => {
                    return (
                        <span>{c.author}<br /></span>
                    )
                })
            }
        </div>);
    }
}

export default Authors;