import React from 'react';
import express from 'express';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Routes from '../../shared/routes/routes';
import storeFactory from '../../shared/redux/index';
import Layout from '../../shared/common/Layout';
import { findActiveRoute } from '../../shared/tools/utils/utils';
import config from './../../../config.test.json';
import actions from '../../shared/redux/actions';
import { User } from '../../shared/redux/modules/User/user.types';
import Authentication from '../../shared/services/Authentication';

const authentication = new Authentication();
const router = express.Router();

export const regexRoute: string = '/:lang([a-z]{2})?/:firstparam?/:secondparam?/:thirdparam?';

router.get(regexRoute, function(req: any, res: any, next: any) {
  // TODO: check express types

  // Get the routes and return the one that matches actual url
  const activeRoute = findActiveRoute(req.url, Routes);

  // Retrieve initial data loaders and pass req.params to them. If empty, send an arraywith a resolved promise
  const initialData = activeRoute.loadInitialData
    ? activeRoute.loadInitialData.map((item: any) => item(req.params))
    : [Promise.resolve()];

  Promise.all([actions.loadLanguages(), ...initialData])
    .then((response: any) => {
      const data = Object.assign({}, ...response);

      // Adding initial user to data from Token to store
      try {
        const user = authentication.verifyToken(req.cookies.sessionToken) as User;
        data.User = {
          ...user,
        };
      } catch (err) {
        data.User = {};
      }

      // Sending the Router with Route component; App component sent inside render method; backend data passed via context
      const context: any = { data }; // TODO: Check this type
      const store = storeFactory(data);
      const appComponentAsString = config.ENABLE_ISOMORPHISM
        ? renderToString(
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <Route
                  path="/"
                  render={props => {
                    return <Layout {...props} />;
                  }}
                />
              </StaticRouter>
            </Provider>
          )
        : '';
      const helmet = Helmet.renderStatic();
      const dataForTemplate = serialize(data); // TODO: this might be processed with JSON.stringify
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
