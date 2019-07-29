import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
import { Cookies } from 'react-cookie';

class Header extends Component {

    constructor(props) {
        super(props);
        this.logininp = React.createRef();
        this.passwordinp = React.createRef();
    }

    state = {
        searchInput: '',
        isAuth: false,
        currentUserInfo: {}
    }

    renderLoginContainer = () => {
        if (this.state.isAuth === false)
            return (
                <div className="signButtonContainer">
                    <div className="loginContainer">
                        <input className="logininp" ref={this.logininp} ></input>
                        <input className="logininp" ref={this.passwordinp} ></input>
                    </div>

                    <div className="signButton">
                        <a onClick={this.handleSignIn} >SIGN IN</a>
                    </div>
                    <div className='signButton'>
                        <Link id='linkToSignUp' to='/register'>SIGN UP</Link>
                    </div>

                    {/* <a className="signButton" onClick={this.handleSignUp} href="#signup" ><Link to='/register'>SIGN UP</Link></a> */}
                </div>
            );


        else if (this.state.isAuth === true)
            return (
                <div className="loggedInfoContainer">
                    <span className="loggedUserInfo">{this.state.currentUserInfo.login}</span><br />
                    <span className="loggedUserInfo">{this.state.currentUserInfo.email}</span><br />
                    <span className="loggedUserInfo">{this.state.currentUserInfo.phone}</span><br />
                    <a href='#' onClick={this.handleLogout}>Logout</a>
                </div>
            );

    }

    //setting the seacrh input's value to "state" and calling "onSearchInput" and passing there search input 
    getSearchInput = (event) => {
        this.setState({ searchInput: event.target.value });
        this.props.onSearchInput(event.target.value);
    }

    // handle user login by sending get request to server for checking 
    handleSignIn = () => {

        //request data that contains user info and password 
        let reqData = {
            login: this.logininp.current.value,
            password: this.passwordinp.current.value
        }

        console.log(reqData);
        axios.post('http://localhost:3001/login', reqData)  //sending request
            .then(res => {

                console.log(res, 'response from login');

                //since the req for login was successful
                //we save login and password in state
                this.setState({ currentUserInfo: res.data });
                //passing response to onLogin prop
                this.props.onLogin();
                //setting state isAuth to TRUE
                this.setState({ isAuth: true });

                //also setting cookies 
                let cookies = new Cookies();
                cookies.set('jwt', res.headers['x-auth-token']);
                console.log(cookies.getAll());
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleLogout = () => {
        this.setState({ isAuth: false });
        let cookies = new Cookies();
        cookies.remove('jwt');
    }

    render() {
        return (
            <div className="header">
                <div className='links'>
                    <a href="#home" id="home">Oqypqal</a>
                    <a href="#genres">Genres</a>
                    <a href="#authors">Authors</a>
                    <a href="#myorder">My Order</a>
                </div>
                <div className='searchContainer'>
                    <p>Search</p>
                    <div className='search' >

                        <input onChange={this.getSearchInput} type='text'></input>
                    </div>
                </div>
                {this.renderLoginContainer()}
            </div>
        );
    }
}

export default Header;