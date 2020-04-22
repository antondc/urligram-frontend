import { match } from 'path-to-regexp';
import * as queryStringParser from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { RouteState } from 'Modules/Routes/routes.types';

/**
 * Receives a route object, an url path, and a query string or/and query params object; extracts the params and query params to enhance the route with them.
 * @param {*} { route, path, queryString, queryParams }
 * @returns
 */

type EnhanceRouteWithParams = (options: {
  route: RouteState;
  urlPath?: string;
  queryString?: string;
  queryParams?: {
    [key: string]: string;
  };
}) => RouteState;

const enhanceRouteWithParams: EnhanceRouteWithParams = ({ route, urlPath, queryString, queryParams }) => {
  const regexp = match(route.path, { decode: decodeURIComponent }); // Create a regexp with the route's path
  const parsedPath = regexp(urlPath); // Parse the url path to extract the params
  const finalParams = parsedPath ? parsedPath.params : undefined; // Extract the params
  const finalQueryParams = queryParams || queryStringParser.parse(queryString) || undefined; // If there are queryParams, use them; otherwise parse the string if present, or undefined

  const enhancedRoute: RouteState = Object.assign(cloneDeep(route), {
    pathname: urlPath,
    params: finalParams,
    queryParams: finalQueryParams,
  });

  return enhancedRoute;
};

export default enhanceRouteWithParams;
