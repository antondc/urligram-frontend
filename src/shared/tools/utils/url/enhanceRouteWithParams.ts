import { match } from 'path-to-regexp';
import * as queryStringParser from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { RouteState, LocationState } from 'Modules/Routes/routes.types';

/**
 * Receives a route object, a queryParams object and a reaact-router-dom location object; extracts the params and query params to enhance the route with them.
 * @param {*} { route, queryParams, location }
 * @returns
 */

type EnhanceRouteWithParams = (options: {
  route: RouteState;
  queryParams?: {
    [key: string]: string;
  };
  location: LocationState;
}) => RouteState;

const enhanceRouteWithParams: EnhanceRouteWithParams = ({ route, queryParams, location }) => {
  const regexp = match(route.path, { decode: decodeURIComponent }); // Create a regexp with the route's path
  const parsedPath = regexp(location.pathname); // Parse the url path to extract the params
  const finalParams = parsedPath ? parsedPath.params : undefined; // Extract the params
  const finalQueryParams = queryParams || queryStringParser.parse(location.search) || undefined; // If there are queryParams, use them; otherwise parse the string if present, or undefined

  const enhancedRoute: RouteState = Object.assign(cloneDeep(route), {
    ...location,
    params: finalParams,
    queryParams: finalQueryParams,
  });

  return enhancedRoute;
};

export default enhanceRouteWithParams;
