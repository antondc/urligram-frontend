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
import serveGzip from './tools/serveGzip';

const compiler = webpack(webpackConfig);
const app = express();

// Serving static files- - - - - - - - - -
app.use(serveGzip);
app.use(express.static('dist'));
app.use(express.static('media/docs'));
app.use(express.static('media/images'));
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
app.use('/', allRoutes);
// - - - - - - - - - - - - - - - - - - - -

app.get('/', (req: any, res: any) => {
  res.render('index');
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  if (err.name === 'UnauthorizedError') {
    return res.redirect(303, '/login');
  }

  next(err);
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    res.status(500);

    return res.render('error', { error: err });
  }

  return next(err);
});

// Launching app
export default app;

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
