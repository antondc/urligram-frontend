import serveGzip from './tools/serveGzip';
import * as bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import allRoutes from './routes/allRoutes';
import cors from 'cors';
import http from 'http';
const device = require('express-device'); // TODO: replace for https://www.npmjs.com/package/express-useragent
import cookiesMiddleware from 'universal-cookie-express';

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
app.use(device.capture({ parseUserAgent: true }));
device.enableDeviceHelpers(app);

// - - - - - - - - - - - - - - - - - - - -

// Logger - - - - - - - - - - - - - - - -
app.use(logger('dev'));
// - - - - - - - - - - - - - - - - - - - -

// Setting universal cookies - - - - - - -
app.use(cookiesMiddleware());
// - - - - - - - - - - - - - - - - - - - -

// API - - - - - - - - - - - - - - - - -
app.use('/', allRoutes);
// - - - - - - - - - - - - - - - - - - - -

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  if (err.name === 'UnauthorizedError') {
    return res.redirect(303, '/login');
  }

  next(err);
});

// Launching app
export default app;
const server = http.createServer(app);

server.listen(process.env.PORT_SERVER);
