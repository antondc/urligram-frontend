import React from 'react';
import express from 'express';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { findActiveRoute } from 'Tools/utils/url';
import config from 'Root/config.test.json';
import Routes, { routesList, routesPathsList } from 'Routes/index';
import Authentication from 'Services/Authentication';
import storeFactory from 'Redux/index';
import Layout from 'Common/Layout';
import { UserState } from 'Modules/User/user.types';
import { loadLanguages } from 'Modules/Languages/actions/loadLanguages';

const authentication = new Authentication();
const router = express.Router();

router.get(routesPathsList, function (req: any, res: any) {
  // Get the routes and return the one that matches actual url
  const activeRoute = findActiveRoute({ path: req.path, routes: routesList, queryParams: req.query });

  // Retrieve initial data loaders and pass req.params to them. If empty, send an arraywith a resolved promise
  const initialData = activeRoute.loadInitialData
    ? activeRoute.loadInitialData.map((item: any) => item(req.params))
    : [Promise.resolve()];

  Promise.all([loadLanguages(req.params.lang), ...initialData])
    .then((response: any) => {
      const data = Object.assign({}, ...response);

      // Adding initial user to data from Token to store
      try {
        const user = authentication.verifyToken(req.cookies.sessionToken) as UserState;
        data.User = {
          ...user,
        };
      } catch (err) {
        data.User = {};
      }

      // Load routes data
      data.Routes = {
        routes: Routes,
        history: [activeRoute],
        currentRoute: activeRoute,
      };

      // Sending the Router with Route component; App component sent inside render method; backend data passed via context
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
      // Render template with component; frontend data passed via template
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
