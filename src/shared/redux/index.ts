import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
  UnknownAction,
} from 'redux';
import { thunk, ThunkAction } from 'redux-thunk';

import { RootState } from 'Modules/rootType';
import { RootReducers } from './rootReducers';

const middleware = [thunk];

// Type for thunks
export type AppThunk<ReturnType, A extends Action = UnknownAction> = ThunkAction<ReturnType, RootState, unknown, A>;

// Declaring Dispatch type to enable return types, as redux Dispatch only consider void return types for actions
declare module 'redux' {
  export interface Dispatch<A extends Action = UnknownAction> {
    <TReturnType = any, TState = any, TExtraThunkArg = any>(
      thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>
    ): TReturnType;
  }
}

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
