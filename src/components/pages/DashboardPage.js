import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class DashboardPage extends React.Component {

    logoutHandler = (e) => {
      logout();
      this.props.history.push('/')
    };

    render() {
      const userAuthenticated = this.props.isAuthenticated;
      return (
        <div>
          <h1> Dashboard Page </h1>
          {userAuthenticated && <button onClick={e=>this.logoutHandler(e)}> Logout </button> }
        </div>
      );
    }
  }

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};


function mapStateToProps(state){
    return {
      isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, {logout})(DashboardPage);
