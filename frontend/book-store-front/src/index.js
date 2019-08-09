import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { Cookies } from 'react-cookie';
let cookie = new Cookies();

let jwtCookie = cookie.get('jwt');


function renderAuth() {
    console.log(jwtCookie, 'cookies')
    if (jwtCookie)
        return <App className='App' isAuth={true} />
    else
        return <App isAuth={false} />
}

ReactDOM.render((
    <BrowserRouter>

        {renderAuth()}

    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
