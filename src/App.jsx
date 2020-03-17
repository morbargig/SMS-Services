import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Remove from './component/Remove'
import Home from './component/Home';


class App extends Component {


  render() {
    return (
      <Router>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/remove/" exact render={() => <Remove state={this.state} />} />
      </Router >
    );
  }
}

export default App;
