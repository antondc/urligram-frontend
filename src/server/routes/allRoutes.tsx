import React from 'react';
import express from 'express';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import config from 'Root/config.test.json';
import Routes, { routesWithoutOmmitedValues, routesList, routesPathsList } from 'Routes/index';
import Authentication from 'Services/Authentication';
import storeFactory from 'Redux/index';
import Layout from 'Common/Layout';
import { SessionState } from 'Modules/Session/Session.types';
import { loadLanguages } from 'Modules/Languages/actions/loadLanguages';

const authentication = new Authentication();
const router = express.Router();

router.get(routesPathsList, function (req: any, res: any) {
  // Get active route key
  const activeRouteKey = findActiveRouteKey({ urlPath: req.path, routes: routesList });

  // Retrieve initial data from loaders passing req.params.
  const initialDataLoaders = Routes[activeRouteKey].loadInitialData.map((item: any) => item(req.params));

  Promise.all([loadLanguages(req.params.lang), ...initialDataLoaders])
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
        urlPath: req.path,
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
            <StaticRouter location={req.url} context={context}>
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
    .catch((error: any) => {
      res.render('error', { error });
    });
});

export default router;
