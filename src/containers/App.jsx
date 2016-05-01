import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const finalCreateStore = compose(
  devTools(),
  persistState(__SERVER__ ? undefined : window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  applyMiddleware(thunk, promise, createLogger())
)(createStore);

const reducer = combineReducers(reducers);
export const store = finalCreateStore(reducer);

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    return (
      <div>
        <Provider store={store}>
          { this.props.children }
        </Provider>
        { __DEVTOOLS__ && <DebugPanel top right bottom>
          <DevTools
            store={store}
            monitor={LogMonitor}
            visibleOnLoad={false}
          />
        </DebugPanel> }
      </div>
    );
  }
}

//module.exports = store;
