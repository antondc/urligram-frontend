import { AnyAction } from 'redux';

import { RootState } from '../modules/rootType';
import type { Middleware } from './middlewareType';

// Logs all actions and states after they are dispatched
export const logger: Middleware<RootState, AnyAction> = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};
