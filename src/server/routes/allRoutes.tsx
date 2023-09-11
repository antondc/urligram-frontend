import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { Route, StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import Layout from 'Common/Layout';
import { initialLanguagesLoader } from 'Modules/Languages/languages.loader';
import { RouteState } from 'Modules/Routes/routes.types';
import { SessionState } from 'Modules/Session/session.types';
import storeFactory from 'Redux/.';
import config from 'Root/config.test.json';
import { RecursiveObject } from 'Root/src/shared/typescript/recursiveObject';
import { Routes, routesList, routesPathsList, routesWithoutOmmitedValues } from 'Router/routes';
import history from 'Services/History';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import { QueryStringWrapper, } from '@antoniodcorrea/utils';
import { TokenJWT } from '@antoniodcorrea/utils-backend';

export type RequestParameters = {
  hostname?: string;
  originalUrl?: string;
  params?: RecursiveObject;
  query?: RecursiveObject;
};

const router = express.Router();

router.get(routesPathsList, async (req: any, res: any, next: any) => {
  // Get active route key
  const activeRouteKey = findActiveRouteKey({ urlPath: req.path, routes: routesList });

  // Decode token, only on server side.
  const tokenJwt = new TokenJWT(process.env.JWT_SECRET);

  // The API in this case returns the session cookie as `{ content: SessionState }`
  // instead of `SessionState` directly. We need to extract and cast it
  const sessionData: SessionState = await tokenJwt.decodeToken<SessionState>(req.cookies?.sessionToken);

  const requestParameters: RequestParameters = {
    hostname: req.hostname,
    originalUrl: req.originalUrl,
    params: {
      ...req.params,
      sessionId: sessionData?.id,
    },
    query: req.query,
  };

  // Set data loaders for logged user or visitor
  const dataLoaders = !!sessionData?.id
    ? Routes[activeRouteKey].initialDataLoadersSession
    : Routes[activeRouteKey].initialDataLoadersVisitor;

  // Use data loaders only if we want SSR: `config.ENABLE_ISOMORPHISM`
  const initialDataLoaders = config.ENABLE_ISOMORPHISM ? dataLoaders : [];

  // Retrieve initial data from loaders passing req.params.
  // We have to execute the thunk, as well as the async function within it
  const initialDataLoadersPromises = initialDataLoaders.map((item: any) => item(requestParameters));

  // Add curent path to history.location
  const location = {
    ...history.location,
    pathname: req.path,
    search: QueryStringWrapper.stringifyQueryParams(req.query),
  };

  Promise.all([initialLanguagesLoader(req.params.lang), ...initialDataLoadersPromises]) // We have to execute the Languages thunk, as well as the async function within it
    .then((response: Array<any>) => {
      const mergedResponse = Object.assign({}, ...response); // Merge the results array into an object

      const initialRoute: RouteState = {
        ...enhanceRouteWithParams({
          route: routesWithoutOmmitedValues[activeRouteKey],
          location: location,
        }),
        domain: req.protocol + '://' + req.get('host'),
        href: req.protocol + '://' + req.get('host') + req.originalUrl,
        pathAndQuery: req.originalUrl,
      };

      const initialState = {
        ...mergedResponse,
        Session: sessionData?.id ? sessionData : mergedResponse?.Session || {}, // If we are receiving cookies with session, use them; otherwise try to use use the session object
        Routes: {
          routes: routesWithoutOmmitedValues,
          history: [initialRoute],
          currentRoute: initialRoute,
        },
      };

      // Send the Router with Route component; App component sent within render method; backend data passed via context
      const context: any = { initialState }; // TODO: Check this type
      const store = storeFactory(initialState);

      /* eslint-disable indent */
      // Create context with data only if we want SSR
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
      const dataForTemplate = serialize(initialState); // Serializing for security reasons: https://redux.js.org/recipes/server-rendering#security-considerations

      res.set({ 'X-Robots-Tag': 'all' }); // Allow robots —crawlers, spiders, etc.—

      // Render template with component; frontend data passed via .ejs template
      res.render('index', {
        toHtml: helmet.htmlAttributes.toString(),
        toHead: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
        body: appComponentAsString,
        data: dataForTemplate, // Send data only if we want SSR
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
