import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Remove from './component/Remove'
import User from './component/User';

class App extends Component {


  render() {
    return (
      <Router>
        <Route path="/" exact render={() => <User />} />
        <Route path="/remove/" exact render={() => <Remove state={this.state} />} />
      </Router >
    );
  }
}

export default App;
