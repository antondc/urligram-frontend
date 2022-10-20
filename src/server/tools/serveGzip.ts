// Middleware to serve gzipped files
// Has to be called before static middleware
import { NextFunction, Request, Response } from 'express';

import { getExtension } from '@antoniodcorrea/utils';

const serveGzip = function (req: Request, res: Response, next: NextFunction): void {
  // No need to compress woff2 fonts
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
