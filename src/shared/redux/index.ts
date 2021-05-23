import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { RootState } from './modules/rootType';
import { RootReducers } from './rootReducers';

const middleware = [thunk];

// Type for thunks
export type AppThunk<ReturnType, Action extends AnyAction = AnyAction> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

// Declaring Dispatch type to enable return types, as redux Dispatch only consider void return types for actions
declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction> {
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
