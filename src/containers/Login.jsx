import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customFont from '../style/custom-font.scss';
import auth from '../core/auth';
import * as CredentialsActions from '../actions/CredentialsActions';

export class Login extends Component {

  static propTypes = {
    route: PropTypes.object,
    credentials: PropTypes.object,
    credentialsActions: PropTypes.object
  };

  static contextTypes = {
    history: PropTypes.object
  };

  constructor(...args) {
    super(...args);
    this.state = {
      isMountedAndCreatedByRouter: false
    };
  }
  componentDidMount() {
    // Chnage 'isMountedAndCreatedByRouter' from false to true
    // only when generated from router for the first time.
    // For animation effect
    if (this.props.route !== undefined) {
      setTimeout(() => this.setState({ isMountedAndCreatedByRouter: true }));
    }
  }
  handleRegisterSubmit(e) {
    e.preventDefault();
    const email = this.refs.newEmail.value;
    const password = this.refs.newPassword.value;

    auth.createUser(email, password, (error) => {
      if(!error){
        auth.userLogin(email, password, this.loginCallback.bind(this));
      }
      else {
        // TODO: set an action indicating the error
        console.log('error creating user' +error);
      }
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    const { credentialsActions } = this.props;
    credentialsActions.addCredentials();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    auth.userLogin(email, password,this.loginCallback.bind(this));

  }

  loginCallback(authenticated, error){
    const { credentialsActions } = this.props;
    if (authenticated) {
      credentialsActions.addCredentialsSucess();
      // update route to show main page
      this.context.history.push('/main');
    } else {
      credentialsActions.addCredentialsFailure(error);
    }
  }

  render() {
    const { credentials } = this.props;
    const { isMountedAndCreatedByRouter } = this.state;
    const { checkingToken, loggingIn, hint } = credentials;
    const hideLogin = (!isMountedAndCreatedByRouter) || checkingToken || loggingIn;

    return (
      <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', textAlign: 'center', backgroundColor: '#F7DF1E', color: 'black' }}>
        <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <div>
            <h1>Score</h1>
          </div>
          <div style={{ maxHeight: hideLogin ? '0' : '298px', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out' }}>
            <h2>Register</h2>
            <form onSubmit={::this.handleRegisterSubmit}>
              <div style={{ paddingTop: '5px' }}>
                <input type="text" ref="newEmail" placeholder="Email"/>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <input type="password" ref="newPassword" placeholder="Password"/>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <input type="submit" value="Register"/>
              </div>
            </form>
            <h2>Login</h2>
            <form onSubmit={::this.handleLoginSubmit}>
              <div style={{ paddingTop: '5px' }}>
                <input type="text" ref="email" placeholder="Email"/>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <input type="password" ref="password" placeholder="Password"/>
                <div style={{ height: '1em' }}>{hint && `Hint: ${hint}`}</div>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <input type="submit" value="Login"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ general: state.general, credentials: state.credentials }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}))(Login);
