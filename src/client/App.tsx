import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import Layout from 'Common/Layout';
import storeFactory from 'Redux/.';
import config from 'Root/config.test.json';
import history from 'Services/History';

interface CustomWindow extends Window {
  __PRELOADED_STATE__: any;
}

declare let window: CustomWindow;

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__; // Allow state to be garbage collected: https://redux.js.org/recipes/server-rendering#clientjs

const store = storeFactory(preloadedState);
const container = document.getElementById('app');
const hydrateOrRender = config.ENABLE_ISOMORPHISM ? hydrateRoot : createRoot;

const renderApp = () =>
  // Sending the Router with Route component; Layout component sent inside render method to insert data
  hydrateOrRender(
    container,
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout} />
      </Router>
    </Provider>
  );

if (module.hot) module.hot.accept('Common/Layout', renderApp); // HMR

renderApp();
