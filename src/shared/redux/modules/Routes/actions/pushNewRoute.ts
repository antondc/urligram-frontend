import { PUSH_NEW_ROUTE, RoutesActionTypes, RouteState } from 'Modules/Routes/routes.types';

export const pushNewRoute = (data: RouteState): RoutesActionTypes => ({
  type: PUSH_NEW_ROUTE,
  data: {
    ...data,
  },
});
