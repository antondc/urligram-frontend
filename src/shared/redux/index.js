import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { HomePage, UserSession, FirstLoad, Language, Languages, NavigatedRoute } from './reducers';
import { verifyCookies } from './middleware/verifyCookies';

const middleware = [thunk, verifyCookies];

// Configuration for Redux devtools
const reduxDevToolsWrapper = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const storeFactory = (initialState = {}) => {
  return reduxDevToolsWrapper(applyMiddleware(...middleware))(createStore)(
    combineReducers({
      HomePage,
      UserSession,
      FirstLoad,
      Language,
      Languages,
      NavigatedRoute,
    }),
    initialState
  );
};

export default storeFactory;
