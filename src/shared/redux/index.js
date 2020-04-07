import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { HomePage, WhoPage, User, Languages } from './reducers';

const middleware = [thunk];

// Configuration for Redux devtools
const reduxDevToolsWrapper = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const storeFactory = (initialState = {}) => {
  return reduxDevToolsWrapper(applyMiddleware(...middleware))(createStore)(
    combineReducers({
      HomePage,
      WhoPage,
      User,
      Languages,
    }),
    initialState
  );
};

export default storeFactory;
