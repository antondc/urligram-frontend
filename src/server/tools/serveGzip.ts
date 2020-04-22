// Middleware to serve gzipped files
// Has to be called before static middleware

import getExtension from 'Tools/utils/file/getExtension';

const serveGzip = function (req: any, res: any, next: any) {
  // TODO: express types
  switch (getExtension(req.url)) {
    case 'js':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/javascript');
      break;
    case 'css':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/css');
      break;
    case 'svg':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'image/svg+xml');
      break;
    case 'woff':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/font-woff');
      break;
    case 'woff2':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/font-woff2');
      break;
    case 'ttf':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/x-font-ttf');
      break;
    case 'eot':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/vnd.ms-fontobject');
      break;
    case 'otf':
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/x-font-opentype');
      break;

    default:
      break;
  }

  next();
};

export default serveGzip;
