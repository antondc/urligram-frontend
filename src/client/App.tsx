import React from 'react';
import { hydrate, render } from 'react-dom';
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
const hydrateOrRender = config.ENABLE_ISOMORPHISM ? hydrate : render;

const renderApp = () =>
  // Sending the Router with Route component; Layout component sent inside render method to insert data
  hydrateOrRender(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout} />
      </Router>
    </Provider>,
    document.getElementById('app')
  );

if (module.hot) module.hot.accept('Common/Layout', renderApp); // HMR

renderApp();
