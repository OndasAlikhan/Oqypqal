import React from 'react';
import { Component } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    list: 0
  }
  render() {
    return (
      <div className="App" >
        <Header />
        <BookList />
      </div>
    );
  }

}

export default App;
