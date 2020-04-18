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

/**
 * Iterate over src/shared/routes/routes.ts and return the one which path prop matching passed url.
 * @param {string} url
 * @param {RoutesState} Routes
 * @returns object of active route
 */

export const findActiveRoute = (url: string, Routes: { [key: string]: RouteState }) => {
  const route = Object.values(Routes).find((route) => matchPath(url, route)) as RouteState;
  const enhancedRoute: RouteState = Object.assign({ pathname: url }, route);

  return enhancedRoute;
};
