import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { ROUTES_NEW_ROUTE_PUSH, RoutesActions, RouteState } from 'Modules/Routes/routes.types';

export const pushNewRoute = (newRoute: RouteState) => (
  dispatch: Dispatch<RoutesActions>,
  getState: () => RootState
): void => {
  const { Routes } = getState();

  dispatch({
    type: ROUTES_NEW_ROUTE_PUSH,
    payload: {
      ...Routes,
      currentRoute: newRoute,
      history: [...Routes.history, newRoute],
    },
  });
};
