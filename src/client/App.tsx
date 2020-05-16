import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Layout from 'Common/Layout';
import storeFactory from 'Redux/index';
import config from 'Root/config.test.json';
import history from 'Services/History';

interface CustomWindow extends Window {
  __PRELOADED_STATE__: any;
}

declare let window: CustomWindow;

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__; // Allow state to be garbage collected: https://redux.js.org/recipes/server-rendering#clientjs

const store = storeFactory(preloadedState);
const renderApp = config.ENABLE_ISOMORPHISM ? hydrate : render;

// Sending the Router with Route component; Layout component sent inside render method to insert data
renderApp(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
