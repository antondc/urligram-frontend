import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Layout from 'Common/Layout';
import storeFactory from 'Redux/index';

interface CustomWindow extends Window {
  __PRELOADED_STATE__: any;
}

declare let window: CustomWindow;

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__; // Allow state to be garbage collected: https://redux.js.org/recipes/server-rendering#clientjs

const store = storeFactory(preloadedState);

const renderApp = () =>
  // Sending the Router with Route component; Layout component sent inside render method to insert data
  render(
    <Provider store={store}>
      <Layout />
    </Provider>,
    document.getElementById('app')
  );

if (module.hot) module.hot.accept('Common/Layout', renderApp); // HMR

renderApp();
