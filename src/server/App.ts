import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import useragent from 'express-useragent';
import bodyParser from 'body-parser';
import fs from 'fs';
import http from 'http';
import https from 'https';
import logger from 'morgan';
import { AddressInfo } from 'net';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { WEBPACK_ROOT } from '../../webpack/constants';
import webpackConfig from '../../webpack/webpack.client.dev';
import allRoutes from './routes/allRoutes';
import signUpConfirmation from './routes/signUpConfirmation';
import serveGzip from './tools/serveGzip';

const compiler = webpack(webpackConfig);
const app = express();

// Serving static files- - - - - - - - - -
app.use(serveGzip);
app.use(express.static('dist'));
app.use(express.static('media/docs'));
app.use(express.static('media/images'));
app.use('/favicons', express.static('src/shared/assets/favicons'));
app.use('/images', express.static('src/shared/assets/images'));
app.use('/files', express.static('src/shared/assets/files'));
app.use('/media', express.static('media'));
// - - - - - - - - - - - - - - - - - - - -

// View settings - - - - - - - - - - - - -
app.set('views', path.join(__dirname, '../src/server/views')); // view engine setup
app.set('view engine', 'ejs');
// - - - - - - - - - - - - - - - - - - - -

// Enabling CORS - - - - - - - - - - - - -
app.use(cors({ credentials: true }));
// - - - - - - - - - - - - - - - - - - - -

// Parsing - - - - - - - - - - - - - - - -
app.use(bodyParser.urlencoded({ extended: false })); // Parsing application/x-www-form-urlencoded:
app.use(bodyParser.json()); // Parsing body
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: false })); // Parsing req.body
app.use(cookieParser()); // Parsing cookies
// - - - - - - - - - - - - - - - - - - - -

// Detecting devices - - - - - - - - - - -
// app.use(device.capture({ parseUserAgent: true }));
// device.enableDeviceHelpers(app);
app.use(useragent.express());

// - - - - - - - - - - - - - - - - - - - -

// Logger - - - - - - - - - - - - - - - -
app.use(logger('dev'));
// - - - - - - - - - - - - - - - - - - - -

if (process.env.NODE_ENV === 'development') {
  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      publicPath: WEBPACK_ROOT,
      writeToDisk: true,
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );
}

// API - - - - - - - - - - - - - - - - -
app.use('/', signUpConfirmation);
app.use('/', allRoutes);
// - - - - - - - - - - - - - - - - - - - -

app.get('/', (req: any, res: any) => {
  res.render('index');
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.log('---------');
  console.error(err);
  console.log('---------');

  const isServerErrorPage = req.path.includes('/500-server-error'); // Check if its server error to break the redirect loop
  const isUnauthorizedError = err.name === 'UnauthorizedError';
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (err && isUnauthorizedError) {
    return res.redirect(303, '/login');
  } else if (err && isDevelopment) {
    return res.status(500).render('error', {
      message: err.message,
      stack: err.stack,
      status: err.status || 500,
    });
  } else if (err && !isServerErrorPage) {
    return res.redirect('/500-server-error');
  } else if (err) {
    // If still there is a non handled error, then render server error page
    res.render('serverError');
  } else {
    // If we didn't handle the error, continue, as this is not an error
    next();
  }
});

/* - - - - - - - - - - - Server - - - - - - - - - - - - - -*/

try {
  const certOptions = {
    key: fs.readFileSync(path.resolve(process.cwd(), 'src/server/ssl/private.key')),
    cert: fs.readFileSync(path.resolve(process.cwd(), 'src/server/ssl/private.crt')),
  };
  const server = https.createServer(certOptions, app);

  server.listen(process.env.SERVER_PORT_HTTPS, () => {
    const address = server.address() as AddressInfo;
    console.log('=> App listening to HTTPS on port: ' + address.port);
  });
} catch {
  console.log('=> SSL configuration files not found, skipping HTTPS server');
} finally {
  const httpServer = http.createServer(app);

  httpServer.listen(process.env.SERVER_PORT_HTTP, () => {
    const address = httpServer.address() as AddressInfo;
    console.log('=> App listening to HTTP on port: ' + address.port);
  });
}
