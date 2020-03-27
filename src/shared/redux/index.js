import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HomePage, UserSession, FirstLoad, Language, Languages, NavigatedRoute } from './reducers';

import thunk from 'redux-thunk';

const clientLogger = store => {
  return next => {
    return action => {
      if (action.type) {
        let result;
        if (process.env.NODE_ENV !== 'production') {
          console.groupCollapsed('Dispatching', action.type);
          console.log('prev state', store.getState());
          console.log('action', action);
        }
        result = next(action);
        if (process.env.NODE_ENV !== 'production') {
          console.log('next state', store.getState());
          console.groupEnd();
        }

        return result;
      } else {
        return next(action);
      }
    };
  };
};

const serverLogger = store => {
  return next => {
    return action => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('\n');
        console.log('Dispatching server action  -  -  -  -  -  -  -  -');
        console.log('\n');
        console.log(action);
        console.log('\n');
        console.log('-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -\n');
        console.log('\n');
      }

      return next(action);
    };
  };
};

const middleware = server => {
  return [server ? serverLogger : clientLogger, thunk];
};

const storeFactory = (server = false, initialState = {}) => {
  return applyMiddleware(...middleware(server))(createStore)(
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
