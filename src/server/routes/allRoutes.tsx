import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { Route, StaticRouter } from 'react-router-dom';
import merge from 'lodash/merge';
import qs from 'qs';
import serialize from 'serialize-javascript';

import Layout from 'Common/Layout';
import { initialLanguagesLoader } from 'Modules/Languages/languages.loader';
import { RouteState } from 'Modules/Routes/routes.types';
import { SessionState } from 'Modules/Session/session.types';
import storeFactory from 'Redux/.';
import config from 'Root/config.test.json';
import { RecursiveObject } from 'Root/src/shared/typescript/recursiveObject';
import { Routes, routesList, routesPathsList, routesWithoutOmmitedValues } from 'Router/routes';
import Authentication from 'Services/Authentication';
import history from 'Services/History';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';

export type RequestParameters = {
  hostname?: string;
  originalUrl?: string;
  params?: RecursiveObject;
  query?: RecursiveObject;
};

const authentication = new Authentication();
const router = express.Router();

router.get(routesPathsList, (req: any, res: any, next: any) => {
  // Get active route key
  const activeRouteKey = findActiveRouteKey({ urlPath: req.path, routes: routesList });

  // Validate session data from token
  let session;
  try {
    session = authentication.verifyToken(req.cookies.sessionToken) as SessionState;
  } catch {
    session = {};
  }

  const requestParameters: RequestParameters = {
    hostname: req.hostname,
    originalUrl: req.originalUrl,
    params: {
      ...req.params,
      sessionId: session?.id,
    },
    query: req.query,
  };

  const initialDataLoaders = !!session?.id
    ? Routes[activeRouteKey].initialDataLoadersSession
    : Routes[activeRouteKey].initialDataLoadersVisitor;

  // Retrieve initial data from loaders passing req.params.
  const initialDataLoadersPromises = initialDataLoaders.map((item: any) => item(requestParameters)); // We have to execute the thunk, as well as the async function within it

  // Add curent path to history.location
  const location = { ...history.location, pathname: req.path, search: qs.stringify(req.query) };

  Promise.all([initialLanguagesLoader(req.params.lang), ...initialDataLoadersPromises]) // We have to execute the Languages thunk, as well as the async function within it
    .then((response: any) => {
      const data = merge(...response); // Use Lodash to merge the result objects of the promises; otherwise we will get only the last result

      // If we are receiving cookies with session, use them; otherwise try to use use the session object
      const sessionData = session?.id ? session : data?.Session || {};

      data.Session = {
        ...sessionData,
      };

      // Load routes data
      const enhancedRoute: RouteState = {
        ...enhanceRouteWithParams({
          route: routesWithoutOmmitedValues[activeRouteKey],
          location: location,
        }),
        domain: req.protocol + '://' + req.get('host'),
        href: req.protocol + '://' + req.get('host') + req.originalUrl,
        pathAndQuery: req.originalUrl,
      };

      data.Routes = {
        routes: routesWithoutOmmitedValues,
        history: [enhancedRoute],
        currentRoute: enhancedRoute,
      };

      // Send the Router with Route component; App component sent within render method; backend data passed via context
      const context: any = { data }; // TODO: Check this type
      const store = storeFactory(data);
      /* eslint-disable indent */
      const appComponentAsString = config.ENABLE_ISOMORPHISM
        ? renderToString(
            <Provider store={store}>
              <StaticRouter location={location} context={context}>
                <Route path="/" render={(props): React.ReactNode => <Layout {...props} />} />
              </StaticRouter>
            </Provider>
          )
        : '';
      /* eslint-enable indent */
      const helmet = Helmet.renderStatic();
      const dataForTemplate = serialize(data); // Serializing for security reasons: https://redux.js.org/recipes/server-rendering#security-considerations

      // Render template with component; frontend data passed via .ejs template
      res.render('index', {
        toHtml: helmet.htmlAttributes.toString(),
        toHead: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
        body: appComponentAsString,
        data: dataForTemplate,
        isDesktop: req.useragent.isDesktop,
        isMobile: req.useragent.isMobile,
        isTablet: req.useragent.isTablet,
        browser: req.useragent.browser,
        isBot: req.useragent.isBot,
      });
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
