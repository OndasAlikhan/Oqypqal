import React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import ClientPage from './components/ClientPage';
import './App.css';

class App extends Component {

  state = {
    list: 0,
    searchInput: ''
  }
  //handling seatch input value sent from Header and passing it to ClientPage
  handleSearchInput = (data) => {
    this.setState({ searchInput: data });
  }
  render() {
    return (
      <div className="App" >
        <Header onSearchInput={this.handleSearchInput} />

        <Route exact path='/admin-panel' component={BookList} />
        <Route exact path='/' component={ClientPage} />
      </div>
    );
  }

}

export default App;
