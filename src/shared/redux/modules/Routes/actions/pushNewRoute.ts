import { PUSH_NEW_ROUTE, RouteState, RoutesTypes } from 'Modules/Routes/routes.types';

export const pushNewRoute = (data: RouteState): RoutesTypes => {
  return {
    type: PUSH_NEW_ROUTE,
    data: {
      ...data,
    },
  };
};
