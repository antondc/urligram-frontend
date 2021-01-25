import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { Route, StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import Layout from 'Common/Layout';
import { initialLanguagesLoader } from 'Modules/Languages/languages.loader';
import { SessionState } from 'Modules/Session/session.types';
import storeFactory from 'Redux/index';
import config from 'Root/config.test.json';
import { RecursiveObject } from 'Root/src/shared/typescript/recursiveObject';
import Routes, { routesList, routesPathsList, routesWithoutOmmitedValues } from 'Routes/index';
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

  const requestParameters: RequestParameters = {
    hostname: req.hostname,
    originalUrl: req.originalUrl,
    params: req.params,
    query: req.query,
  };
  // Retrieve initial data from loaders passing req.params.
  const initialDataLoaders = Routes[activeRouteKey].loadInitialData.map((item: any) => item(requestParameters)); // We have to execute the thunk, as well as the async function within it

  // Add curent path to history.location
  const location = { ...history.location, pathname: req.path };

  Promise.all([initialLanguagesLoader(req.params.lang), ...initialDataLoaders]) // We have to execute the Languages thunk, as well as the async function within it
    .then((response: any) => {
      const data = Object.assign({}, ...response);

      // Validate session data from token
      try {
        const session = authentication.verifyToken(req.cookies.sessionToken) as SessionState;
        data.Session = {
          ...session,
        };
      } catch (err) {
        data.Session = {};
      }

      // Load routes data
      const enhancedRoute = enhanceRouteWithParams({
        route: routesWithoutOmmitedValues[activeRouteKey],
        location: location,
        queryParams: req.query,
      });

      data.Routes = {
        routes: routesWithoutOmmitedValues,
        history: [enhancedRoute],
        currentRoute: enhancedRoute,
      };

      // Send the Router with Route component; App component sent within render method; backend data passed via context
      const context: any = { data }; // TODO: Check this type
      const store = storeFactory(data);
      const appComponentAsString = config.ENABLE_ISOMORPHISM
        ? renderToString(
            <Provider store={store}>
              <StaticRouter location={location} context={context}>
                <Route path="/" render={(props): React.ReactNode => <Layout {...props} />} />
              </StaticRouter>
            </Provider>
          )
        : '';
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
