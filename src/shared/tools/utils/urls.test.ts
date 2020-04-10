import { urlBuild, urlToAbsolute } from './url';
import config from 'Root/config.test.json';

describe('urlToAbsolute', () => {
  test('it should return a string with leading slash and no trailing slash', () => {
    const input = '/one/two/three/';
    const output = '/one/two/three';

    expect(urlToAbsolute(input)).toEqual(output);
  });
});

describe('urlBuild', () => {
  test('it should return a full url', () => {
    const input = {
      protocol: 'http://',
      host: 'example.com',
      port: 8080,
      path: '/path',
    };
    const output = 'http://example.com:8080/path';
    expect(urlBuild(input)).toEqual(output);
  });
});

describe('urlBuild', () => {
  test('it should return a full url', () => {
    const input = {
      domain: 'https://example.com',
      path: '/path',
    };
    const output = 'https://example.com/path';
    expect(urlBuild(input)).toEqual(output);
  });
});

describe('urlBuild', () => {
  test('it should return a full url', () => {
    const input = {
      protocol: 'http',
      host: '0.0.0.0',
      path: '/',
    };
    const output = 'http://0.0.0.0';
    expect(urlBuild(input)).toEqual(output);
  });
});

describe('urlBuild', () => {
  test('it should return a full url', () => {
    const input = {
      protocol: config.SERVER_PRODUCTION_PROTOCOL,
      host: config.SERVER_PRODUCTION_HOST,
      port: config.SERVER_PRODUCTION_PORT,
    };
    const output = 'http://antoniodiaz.me:16887';
    expect(urlBuild(input)).toEqual(output);
  });
});
