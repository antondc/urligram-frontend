import * as React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../shared/common/Layout';
import storeFactory from '../shared/redux/index';
import config from './../../config.test.json';
// https://stackoverflow.com/a/45352250/7499416

interface CustomWindow extends Window {
  data: any;
}

declare let window: CustomWindow;

window.data = window.data || {};

const store = storeFactory(window.data);
const renderApp = config.ENABLE_ISOMORPHISM ? hydrate : render;

// Sending the Router with Route component; App component sent inside render method to insert data
renderApp(
  <Provider store={store}>
    <BrowserRouter>
      <Route
        path="/"
        render={props => {
          return <App {...props} />;
        }}
      />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
