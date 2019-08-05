import React from 'react';
import { Component } from 'react';
import { Cookies } from 'react-cookie';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import ClientPage from './components/ClientPage';
import SignUpPage from './components/SignUpPage';
import './App.css';
import MyOrder from './components/MyOrder';
import Authors from './components/Authors';
import Main from './components/Main';
import Genres from './components/Genres';

class App extends Component {

  state = {
    list: 0,
    searchInput: '',
    isAuth: this.props.isAuth,
    currentUserId: ''
  }
  //handling search input value sent from Header and passing it to ClientPage
  handleSearchInput = (data) => {
    this.setState({ searchInput: data });
  }

  handleLogin = () => {
    this.setState({ isAuth: true });
    console.log('is AUTH is true in App.js');
  }

  handleLogout = () => {
    this.setState({ isAuth: false });
    console.log('auth is false inside App.js');
    let cookie = new Cookies();
    cookie.remove('jwt');
  }


  render() {
    return (
      <div className="App" >
        <Header
          isAuth={this.props.isAuth}
          onSearchInput={this.handleSearchInput}
          onLogin={this.handleLogin}
          onLogout={this.handleLogout}
        />
        <Route exact path='/' component={Main}></Route>
        <Route exact path='/admin-panel' component={BookList} />
        <Route path='/books' component={ClientPage} />
        <Route path='/register' component={SignUpPage} />
        <Route path='/my-order' render={() => <MyOrder isAuth={this.props.isAuth} />} />

        <Route path='/authors' component={Authors} />
        <Route path='/genres' component={Genres} />
      </div>
    );
  }

}

export default App;
