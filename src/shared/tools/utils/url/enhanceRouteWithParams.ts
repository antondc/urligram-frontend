import cloneDeep from 'lodash/cloneDeep';
import { match } from 'path-to-regexp';

import { RouteState } from 'Modules/Routes/routes.types';
import { Route } from 'Router/routes';
import { Location } from 'Services/History';
import { QueryStringWrapper } from '@antoniodcorrea/utils';
/**
 * Receives a route object and a react-router-dom-ish location object; extracts the params and query params to enhance the route with them.
 * @param {*} { route, queryParams, location }
 * @returns
 */

type EnhanceRouteWithParams = (options: { route: Route; location: Location }) => RouteState;

const enhanceRouteWithParams: EnhanceRouteWithParams = ({ route, location }) => {
  const regexp = match(route?.path, { decode: decodeURIComponent }); // Create a regexp with the route's path
  const parsedPath = regexp(location.pathname); // Parse the url and match it
  const finalParams = parsedPath ? parsedPath.params : undefined; // Extract the params

  // Remove starting quote if exists and parse query params.
  const queryParams = QueryStringWrapper.parseQueryString(location.search);

  const enhancedRoute: RouteState = Object.assign(cloneDeep(route), {
    href: '',
    pathAndQuery: '',
    ...location,
    params: finalParams,
    queryParams,
  });

  return enhancedRoute;
};

export default enhanceRouteWithParams;
