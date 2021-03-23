import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { RootReducers } from './rootReducers';

const middleware = [thunk];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Configuration for Redux devtools
const reduxDevToolsWrapper = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const storeFactory = (initialState = {}): any =>
  reduxDevToolsWrapper(applyMiddleware(...middleware))(createStore)(combineReducers(RootReducers), initialState);

export default storeFactory;
