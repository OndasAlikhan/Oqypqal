import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
class Header extends Component {

    constructor(props) {
        super(props);
        this.logininp = React.createRef();
        this.passwordinp = React.createRef();
    }

    state = {
        searchInput: ''
    }

    //setting the seacrh input's value to "state" and calling "onSearchInput" and passing there search input 
    getSearchInput = (event) => {
        this.setState({ searchInput: event.target.value });
        this.props.onSearchInput(event.target.value);
    }

    // handle user login by sending get request to server for checking 
    handleSignIn = () => {
        let reqData = {
            login: this.logininp.current.value,
            password: this.passwordinp.current.value
        }

        console.log(reqData);
        axios.post('http://localhost:3001/login', reqData)
            .then(res => {

                console.log(res, 'response from login');

            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <div className="header">
                <a href="#home" id="home">HOME</a>
                <a href="#genres">GENRES</a>
                <a href="#authors">AUTHORS</a>
                <p>Search</p>
                <input onChange={this.getSearchInput} className='search' type='text'></input>
                <div className="signButtonContainer">
                    <div className="loginContainer">
                        <input className="logininp" ref={this.logininp} ></input>
                        <input className="logininp" ref={this.passwordinp} ></input>
                    </div>
                    <Link className='signButton' to='/register'>SIGN UP</Link>

                    <button className="signButton" onClick={this.handleSignIn} >SIGN IN</button>
                    {/* <a className="signButton" onClick={this.handleSignUp} href="#signup" ><Link to='/register'>SIGN UP</Link></a> */}
                </div>
            </div>

        );
    }
}

export default Header;