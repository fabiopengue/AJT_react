import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({isAuthenticated, isConfirmed, logout}) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage/>}
    <h1> Dashboard Page </h1>
    {isAuthenticated && (<Link to='/'>
      <button onClick={() => logout()}>Logout</button>
    </Link>) }
  </div>
);

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps, {logout: actions.logout})(DashboardPage);
