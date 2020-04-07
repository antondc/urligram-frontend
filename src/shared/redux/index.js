import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { RootReducers } from './rootReducers';
const middleware = [thunk];

// Configuration for Redux devtools
const reduxDevToolsWrapper = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const storeFactory = (initialState = {}) => {
  return reduxDevToolsWrapper(applyMiddleware(...middleware))(createStore)(combineReducers(RootReducers), initialState);
};

export default storeFactory;
