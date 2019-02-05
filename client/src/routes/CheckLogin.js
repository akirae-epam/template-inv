import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SetUser from 'admin/services/SetUser';
import LoginForm from 'admin/forms/LoginForm';
import * as authActions from 'actions/authentication';
import {Link} from 'react-router-dom';
import AdminRoutes from 'routes/AdminRoutes';

import {siteRoutes} from 'data/siteRoutes';

import backgroundImage from 'media/2.jpg';

let json = require('config.json');
let emailAddress= json.emailAddress;

const LoginDisplay = ({loggedIn, login, email,}) => {
  if (loggedIn && email === emailAddress){
    return (
      <AdminRoutes/>
    );
  }
  else {
    return (
      <div className="admin_login_wrapper" id="scroll_admin">
        <div className="admin_login_container">
          <div className="admin_container__body">
            <LoginForm onSubmit={login}/>
          </div>
        </div>
        <Link
          to={siteRoutes.home}
          className="admin_login__return"
        >
          Return to Site
        </Link>
      </div>
    );
  }
};

class CheckLogin extends Component {
  login = values => {
    this.props.authActions.signInUser(values, '/');
  };

  render() {

    const {
      loggedIn,
      email,
    }=this.props;

    const backgroundStyle = {
      backgroundImage: 'url('+backgroundImage+')',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: '0px',
      left: '0px',
    };

    return (
      <div style={backgroundStyle}>
        <div style={backgroundStyle}/>
        <SetUser/>
        <LoginDisplay
          loggedIn = {loggedIn}
          signOut={this.signOut}
          login={this.login}
          email={email}
        />
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
    email: state.authentication.email,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(CheckLogin);
