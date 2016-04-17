import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import auth from '../core/auth';
import { Link } from 'react-router'

const style = {
  marginTop: '15%',
  border: '10px solid transparent',
  boxShadow: '2px 2px 10px 0px',
  borderRadius: '10px'
};

export class Profile extends Component {
  static propTypes = {
   	credentialsActions: PropTypes.object.isRequired,
  };
  static contextTypes = {
    history: PropTypes.object
  };
  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();
    // update route to show login page
    this.context.history.push('/login');
  }
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ marginTop: '5px' }} onClick={::this.handleLogout}> Logout </button>
        </div>
        This is your Score Profile
        <div style={style}>
          username: Kevin <br/>
          profile picture: not available <br/>
          stats: not available <br/>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ }), dispatch => ({
	credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}))(Profile);