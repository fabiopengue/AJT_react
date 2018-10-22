import React from 'react';
import PropTypes from 'prop-types';
// import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'

const App = ({location}) => (
  <div className="App">
    <GuestRoute location={location} path='/' exact component={HomePage} />
    <GuestRoute location={location} path='/signup' exact component={SignupPage} />
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
