import serveGzip from './tools/serveGzip';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import allRoutes from './routes/allRoutes';
import cors from 'cors';
import http from 'http';
import useragent from 'express-useragent';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const webpackConfig = require('../../webpack/webpack.client.dev.ts');
import { WEBPACK_ROOT } from '../../webpack/constants';

const compiler = webpack(webpackConfig);
const app = express();

// Serving static files- - - - - - - - - -
app.use(serveGzip);
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

// Launching app
export default app;
const server = http.createServer(app);

server.listen(4000);
