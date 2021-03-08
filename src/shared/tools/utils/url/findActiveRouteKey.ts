import { matchPath } from 'react-router-dom';

import { Route } from 'Router/routes';

/**
 * Iterates over src/shared/routes/routes.ts and return the keyof the route whose path prop matches passed url.
 * @param {*} { urlPath, routes }
 * @returns
 */

type FindActiveRouteKey = (options: { urlPath?: string; routes: Route[] }) => string;

const findActiveRouteKey: FindActiveRouteKey = ({ urlPath, routes }) => {
  const routeKey = routes.find((route) => matchPath(urlPath, route));
  if (!routeKey) return null;

  return routeKey.name;
};
export default findActiveRouteKey;
