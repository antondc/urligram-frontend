import { ROUTES_NEW_ROUTE_PUSH, RoutesActions, RoutesState } from './routes.types';

const initialState: RoutesState = {
  routes: [],
  history: [],
  currentRoute: undefined,
};

export const Routes = (state = initialState, action: RoutesActions): RoutesState => {
  switch (action.type) {
    case ROUTES_NEW_ROUTE_PUSH:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
