import React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import ClientPage from './components/ClientPage';
import SignUpPage from './components/SignUpPage';
import './App.css';
import { Cookies } from 'react-cookie';
class App extends Component {

  state = {
    list: 0,
    searchInput: '',
    isAuth: false
  }
  //handling search input value sent from Header and passing it to ClientPage
  handleSearchInput = (data) => {
    this.setState({ searchInput: data });
  }

  handleLogin = (data) => {
    this.setState({ isAuth: true });
  }

  logCookies() {
    let cookies = new Cookies();
    console.log(cookies.getAll(), 'cookies');
  }

  render() {
    return (
      <div className="App" >{
        this.logCookies()
      }
        <Header onSearchInput={this.handleSearchInput} onLogin={this.handleLogin} />
        <Route exact path='/admin-panel' component={BookList} />
        <Route exact path='/' component={ClientPage} />
        <Route path='/register' component={SignUpPage} />
      </div>
    );
  }

}

export default App;
