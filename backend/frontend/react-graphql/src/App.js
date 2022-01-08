import React, { Component } from 'react';


import './App.css';
import ManageUsers from './components/ManageUsers';
import ManagePosts from './components/ManagePosts';

class App extends Component {

  render() {
    return (
      <div className="container">
        <ManageUsers />
        <hr />
        <ManagePosts />
      </div>
    )
  }
}

export default App;