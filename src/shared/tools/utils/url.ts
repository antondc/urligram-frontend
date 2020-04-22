import { matchPath } from 'react-router-dom';
import { match } from 'path-to-regexp';
import * as queryStringParser from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { RouteState } from 'Modules/Routes/routes.types';

/**
 * Receives a path starting or ending with or without slashes, and returns with a starting slash only
 * @param {string} [string='']
 * @returns {string}
 */
type UrlToAbsolute = (url: string) => string;

export const urlToAbsolute: UrlToAbsolute = (string = ''): string => {
  if (string === '') return '';
  const formattedString = string.replace(/(^[^\/])/, '/$1').replace(/([\/]$)/, '');

  return formattedString;
};

/**
 * Receives parsed elements of an url returns it composed
 * @param {*} { domain, protocol = 'https://', host, port = '', path = '' }
 * @returns {string}
 */

interface Url {
  protocol?: string;
  host?: string;
  port?: number | string;
  domain?: string;
  path?: string;
}

type UrlBuild = (url: Url) => string;

export const urlBuild: UrlBuild = ({ domain, protocol = 'https://', host, port = '', path = '' }): string => {
  const formattedPath = urlToAbsolute(path);
  const formattedProtocol = protocol.replace(/([^\:\/\/]$)/, '$1://');

  if (domain) {
    const formattedDomain = domain;
    const url = formattedDomain + formattedPath;

    return url;
  }

  const formattedPort = port.toString().replace(/([^:])/, ':$1');
  const url = formattedProtocol + host + formattedPort + formattedPath;

  return url;
};

/**
 * Iterates over src/shared/routes/routes.ts and return the keyof the route which path prop matches passed url.
 * @param {*} { path, routes, queryString, queryParams }
 * @returns
 */

type FindActiveRouteKey = (options: { urlPath?: string; routes: RouteState[] }) => string;

export const findActiveRouteKey: FindActiveRouteKey = ({ urlPath, routes }) => {
  const routeKey = routes.find((route) => matchPath(urlPath, route));
  if (!routeKey) return null;

  return routeKey.name;
};

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

export const enhanceRouteWithParams: EnhanceRouteWithParams = ({ route, urlPath, queryString, queryParams }) => {
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
