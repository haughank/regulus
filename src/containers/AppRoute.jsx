import React, { Component, PropTypes } from 'react';
import Router, { Route } from 'react-router';
import { createHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import TodoApp from './TodoApp.jsx';
import League from './League.jsx';
import Navigation from './Navigation.jsx';
import Profile from './Profile.jsx';
import Home from './Home.jsx';
import AddScore from './AddScore.jsx';
import auth from '../core/auth';
import * as CredentialsActions from '../actions/CredentialsActions';

class AppRoute extends Component {
  static propTypes = {
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(...args) {
    super(...args);

    this._authenticated = this.props.stores.credentials.authenticated;
    this._isCheckingInitialLogIn = true;
    this._shouldRouterUpdate = true;

    const history = createHistory();

    this.state = {
      history
    };

    const { credentialsActions } = this.props.actions;
    credentialsActions.checkCredentials();

    const handleLoggedIn = (authenticated) => {
      this._isCheckingInitialLogIn = false;
      if (authenticated) {
        credentialsActions.checkCredentialsSucess();
      } else {
        setTimeout(() => {
          credentialsActions.checkCredentialsFailure();
        });
      }
    };

    auth.loggedIn(handleLoggedIn);
  }
  componentDidMount() {
    this.checkIfToStopAppRouterRenders();
  }
  shouldComponentUpdate(nextProps) {
    // Each time props are about to update - switch url if needed
    this._authenticated = nextProps.stores.credentials.authenticated;
    if (this.props.stores.credentials.authenticated !== this._authenticated) {
    //  this.state.history.pushState(null, '/');
    }
    return this._shouldRouterUpdate;
  }
  componentDidUpdate() {
    this.checkIfToStopAppRouterRenders();
  }
  checkIfToStopAppRouterRenders() {
    // After done checking and flushed to dom , do not update again
    if (!this._isCheckingInitialLogIn) {
      this._shouldRouterUpdate = false;
    }
  }
  checkAuth(nextState, replaceState) {
    if (!this._authenticated) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }
  handleRedirect(nextState, replaceState) {
    replaceState({ nextPathname: nextState.location.pathname }, this._authenticated ? '/home' : '/login');
  }

  // these two things are passing the history to login.jsx via context (also used for logout)
  // note that this method is deprecated in react-router 2.0 (using 1.0 now)
  static childContextTypes = {
    history: PropTypes.object
  }
  getChildContext() {
    return this.state;
  }

  render() {
    const { history } = this.state;

    if (this._isCheckingInitialLogIn) {
      return (<Login/>);
    }

    return (
      <Router history={history}>
        <Route path="/nav" component={Navigation} onEnter={::this.checkAuth}>
          <Route path="/main" component={TodoApp}/>
          <Route path="/home" component={Home}/>
          <Route path="/score" component={AddScore}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/league" component={League}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="*" onEnter={::this.handleRedirect}/>
      </Router>
    );
  }
}
export default connect(state => ({ stores: state }), dispatch => ({
  actions: {
    credentialsActions: bindActionCreators(CredentialsActions, dispatch)
  }
}))(AppRoute);
