import React from 'react';
import express from 'express';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter, Route, matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Routes from '../../shared/routes/routes';
import storeFactory from '../../shared/redux/index';
import Layout from '../../shared/common/Layout';
import { findActiveRoute, checkIfFileUrls } from '../../shared/tools/utils/utils';
import config from './../../../config.test.json';
import actions from '../../shared/redux/actions';
import { User } from '../../shared/redux/types';
import Cookies from '../../shared/services/Cookies';
import { urlBuild } from '../../shared/tools/utils/url';

const cookies = new Cookies();
const router = express.Router();

// TODO: this should be in a declaration file
export interface Global {
  document: Document;
  window: Window;
  isIE: any;
}

// TODO: this should be in a declaration file
declare var global: Global;

router.get('/:lang([a-z]{2})?/:rest(*[a-z])?/:item([0-9])?', function(req: any, res: any, next: any) {
  // TODO: check express types
  // Check for old browsers; the check for client is in App.js
  if (req.useragent.browser == 'IE') {
    global.isIE = true;
  }

  // Requesting original url
  const url = urlBuild({ protocol: req.protocol, host: req.host, path: req.originalUrl });
  const domain = urlBuild({ protocol: req.protocol, host: req.host });

  // Get the routes and return the one that matches actual url
  const activeRoute = findActiveRoute(req.url, Routes);
  const allLanguages = actions.loadLanguages();

  allLanguages
    .then((languages: any) => {
      // Comparing param language with existing languages; if not exist, undefined.
      const langParam = languages.Languages.find((item: any) => req.params.lang === item.slug)?.slug;
      // Looking for default language in all Languages
      const defaultLanguage = languages.Languages.find((item: any) => !!item.isDefault);

      // Setting proper language
      const lang = langParam || defaultLanguage.slug;
      const params = {
        lang: lang,
        item: req.params.item,
      };

      const currentLanguage = actions.loadLanguage(lang);
      const pageData = activeRoute.loadInitialData ? activeRoute.loadInitialData(params) : Promise.resolve({});
      Promise.all([pageData, currentLanguage])
        .then((data: any[] | any) => {
          // TODO: type error, array or object?
          data = Object.assign({}, ...data);
          data.Languages = languages.Languages;
          data.FirstLoad = {
            url: url,
            domain: domain,
            date: new Date(),
          };
          data.NavigatedRoute = actions.setNavigatedRoute({ route: activeRoute.name }).data;

          // Adding initial user to data from Token to store
          if (req.cookies.sessionToken) {
            try {
              const user: User = cookies.verifyToken(req.cookies.sessionToken) as User;

              data.UserSession = {
                ...user,
              };
            } catch (err) {
              data.UserSession = {};
              console.log(err);
            }
          }

          // Sending the Router with Route component; App component sent inside render method; backend data passed via context
          const context: any = { data }; // TODO: Check this type
          const store = storeFactory(data);
          const appString = config.ENABLE_ISOMORPHISM
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
          const dataForTemplate = serialize(data); // TODO: this may be processed with JSON.stringify
          // Render template with component; frontend data passed via template
          res.render('index', {
            toHtml: helmet.htmlAttributes.toString(),
            toHead: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
            body: appString,
            data: dataForTemplate, // Data for the template
            isDesktop: req.useragent.isDesktop,
            isMobile: req.useragent.isMobile,
            isTablet: req.useragent.isTablet,
            browser: req.useragent.browser,
            isBot: req.useragent.isBot,
          });
        })
        .catch(next);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

export default router;
