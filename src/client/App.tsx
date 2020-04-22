import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../shared/common/Layout';
import storeFactory from '../shared/redux/index';
import config from './../../config.test.json';

interface CustomWindow extends Window {
  __PRELOADED_STATE__: any;
}

declare let window: CustomWindow;

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__; // Allow state to be garbage collected: https://redux.js.org/recipes/server-rendering#clientjs

const store = storeFactory(preloadedState);
const renderApp = config.ENABLE_ISOMORPHISM ? hydrate : render;

// Sending the Router with Route component; App component sent inside render method to insert data
renderApp(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
