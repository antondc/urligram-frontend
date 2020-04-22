import { matchPath } from 'react-router-dom';
import { RouteState } from 'Modules/Routes/routes.types';

/**
 * Iterates over src/shared/routes/routes.ts and return the keyof the route which path prop matches passed url.
 * @param {*} { path, routes, queryString, queryParams }
 * @returns
 */

type FindActiveRouteKey = (options: { urlPath?: string; routes: RouteState[] }) => string;

const findActiveRouteKey: FindActiveRouteKey = ({ urlPath, routes }) => {
  const routeKey = routes.find((route) => matchPath(urlPath, route));
  if (!routeKey) return null;

  return routeKey.name;
};
export default findActiveRouteKey;
