import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    })
      .catch(err => console.error('authenticate user err', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-outline-light mx-auto google-btn" onClick={this.authenticateUser}>
          <img src="https://i.stack.imgur.com/JkSed.png" alt="google login"></img>
        </button>
      </div>
    );
  }
}

export default Auth;
