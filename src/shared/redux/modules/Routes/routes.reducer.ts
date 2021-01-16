import { PUSH_NEW_ROUTE, RoutesActionTypes, RoutesState } from './routes.types';

const initialState: RoutesState = {
  routes: [],
  history: [],
  currentRoute: undefined,
};

export const Routes = (state = initialState, action: RoutesActionTypes): RoutesState => {
  switch (action.type) {
    case PUSH_NEW_ROUTE:
      return Object.assign({}, state, {
        currentRoute: action.data,
        history: [...state.history, action.data],
      });

    default:
      return Object.assign({}, state);
  }
};
