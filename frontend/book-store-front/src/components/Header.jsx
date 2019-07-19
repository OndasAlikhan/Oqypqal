import React, { Component } from 'react';
import './Header.css';
class Header extends Component {

    state = {
        searchInput: ''
    }

    //setting the seacrh input's value to "state" and calling "onSearchInput" and passing there search input 
    getSearchInput = (event) => {
        this.setState({ searchInput: event.target.value });
        this.props.onSearchInput(event.target.value);
    }

    render() {
        return (
            <div className="header">
                <a href="#home" id="home">HOME</a>
                <a href="#genres">GENRES</a>
                <a href="#authors">AUTHORS</a>
                <input onChange={this.getSearchInput} className='search' type='text'></input>
                <div className="signButtonContainer">
                    <a className="signButton" href="#signin" >SIGN IN</a>
                    <a className="signButton" href="signup">SIGN UP</a>
                </div>
            </div>

        );
    }
}

export default Header;