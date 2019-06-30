import React from 'react';
import './Header.css';
function Header() {
    return (
        <div className="header">
            <a href="#home" id="home">HOME</a>
            <a href="#genres">GENRES</a>
            <a href="#authors">AUTHORS</a>

            <div className="signButtonContainer">
                <a className="signButton" href="#signin" >SIGN IN</a>
                <a className="signButton" href="signup">SIGN UP</a>
            </div>
        </div>

    );
}

export default Header;