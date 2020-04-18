import { RoutesState, RouteState } from '../../redux/modules/Routes/routes.types';
import { matchPath } from 'react-router-dom';
import get from 'lodash/get';
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

export /**
 * Check an object with routes and return the one which path prop matches passed url.
 * @param {string} url
 * @param {RoutesState} Routes
 * @returns object of active route
 */
const findActiveRoute = (url: string, Routes) =>
  Object.values(Routes).find((route) => {
    return matchPath(url, route);
  }) || {};

export /**
 * Check an object with routes and return the one which path prop matches passed url.
 * @param {string} url
 * @param {RoutesState} Routes
 * @returns object of active route
 */
const findActiveRouteForState = (url: string, Routes) => {
  const result: any = Object.values(Routes).find((route) => matchPath(url, route)) || {};

  const formattedRoute: RouteState = {
    name: result.name,
    pathname: url,
    regex: result.path,
    exact: result.exact,
    auth: result.auth,
  };

  return formattedRoute;
};
