import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={HomePage} />
        <Route path='/signup' exact component={SignupPage} />
        <Route path='/dashboard' exact component={DashboardPage} />
      </div>
    );
  }
}

export default App;
