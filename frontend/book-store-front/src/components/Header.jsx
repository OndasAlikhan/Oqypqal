import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
import { Cookies } from 'react-cookie';
const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'https://foo.api.net/';

class Header extends Component {

    constructor(props) {
        super(props);
        this.logininp = React.createRef();
        this.passwordinp = React.createRef();
    }

    state = {
        searchInput: '',
        isAuth: this.props.isAuth,
        currentUserInfo: {}
    }

    componentDidMount() {
        this.getUserInfoRequest();

        console.log('right is Auth in header is ', this.state.isAuth);
    }
    componentDidUpdate(prevProps) {
        console.log('calling that');
        console.log('isAuth state', this.state.isAuth);
        console.log('isAuth prpos', this.props.isAuth);

        if (this.props.isAuth)
            if (this.props.isAuth !== prevProps.isAuth)
                this.setState({ isAuth: true });
    }

    renderLoginContainer = () => {
        //initally user is not authorised 
        //therefore the login input forms are rendered to the page 
        if (this.state.isAuth === false)
            return (
                <div className="signButtonContainer">
                    <div className="signButton">
                        <Link to="/login" >SIGN IN</Link>
                    </div>
                    <div className='signButton'>
                        <Link id='linkToSignUp' to='/register'>SIGN UP</Link>
                    </div>

                </div>
            );

        //if user logged in his information is shown, instead of login inputs
        else if (this.state.isAuth === true)
            return (
                <div className="loggedInfoContainer">
                    <span className="loggedUserInfo">{this.state.currentUserInfo.login}</span><br />
                    <a href='#' onClick={this.handleLogout}>Logout</a>
                </div>
            );

    }

    //setting the seacrh input's value to "state" and calling "onSearchInput" and passing there search input 
    getSearchInput = (event) => {
        this.setState({ searchInput: event.target.value });
        this.props.onSearchInput(event.target.value);
    }

    getUserInfoRequest = () => {
        let cookie = new Cookies();
        if (cookie.get('jwt'))
            axios.get(endpoint.concat('/me'), { 'headers': { 'x-auth-token': cookie.get('jwt') } })
                .then(res => {
                    this.setState({ currentUserInfo: res.data })
                    this.setState({ isAuth: true })
                })

                .catch(ex => console.log(ex));


    }

    handleLogout = () => {
        this.props.onLogout();
        this.setState({ isAuth: false });
        let cookies = new Cookies();
        cookies.remove('jwt');
    }

    render() {
        return (
            < div className="header" >
                <div className='links'>
                    <Link to="/" id="home">Oqypqal</Link>
                    <Link to="/books">Books</Link>
                    <Link to='/genres'>Genres</Link>
                    <Link to="/authors">Authors</Link>
                    <Link to='/my-order'>My Order</Link>
                </div>
                <div className='searchContainer'>
                    <p>Search</p>
                    <div className='search' >

                        <input onChange={this.getSearchInput} type='text'></input>
                    </div>
                </div>
                {this.renderLoginContainer()}
            </div >
        );
    }
}

export default Header;