import { match } from 'path-to-regexp';
import * as queryStringParser from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { RouteState } from 'Modules/Routes/routes.types';
import { Location } from 'Services/History';
import { Route } from 'Routes/index';
/**
 * Receives a route object, a queryParams object and a reaact-router-dom location object; extracts the params and query params to enhance the route with them.
 * @param {*} { route, queryParams, location }
 * @returns
 */

type EnhanceRouteWithParams = (options: {
  route: Route;
  queryParams?: {
    [key: string]: string;
  };
  location: Location;
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
