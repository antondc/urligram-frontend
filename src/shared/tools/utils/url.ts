import { matchPath } from 'react-router-dom';
import { match } from 'path-to-regexp';
import * as queryStringParser from 'query-string';
import { RouteState } from '../../redux/modules/Routes/routes.types';

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
 * Iterates over src/shared/routes/routes.ts and return the one which path prop matching passed url.
 * @param {*} { path, routes, queryString, queryParams }
 * @returns
 */

type FindActiveRoute = (options: {
  path?: string;
  queryString?: string;
  queryParams?: {
    [key: string]: string;
  };
  routes: RouteState[];
}) => RouteState;

export const findActiveRoute: FindActiveRoute = ({ path, routes, queryString, queryParams }) => {
  const route = routes.find((route) => matchPath(path, route)) as RouteState; // Find the Route whose path matches the url path
  const regexp = match(route.path, { decode: decodeURIComponent }); // Create a regexp with the route's path
  const parsedPath = regexp(path); // Parse the path to extract the params
  const finalParams = parsedPath ? parsedPath.params : undefined; // Extract the params
  const finalQueryParams = queryParams || queryStringParser.parse(queryString) || undefined; // If there are queryParams, use them; otherwise parse the string if present, or undefined

  const finalRoute: RouteState = Object.assign(route, {
    pathname: path,
    params: finalParams,
    queryParams: finalQueryParams,
  });

  return finalRoute;
};
