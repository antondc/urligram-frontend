import urlBuild from './urlBuild';

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
      protocol: 'http',
      host: 'woprs.com',
      port: 19079,
    };
    const output = 'http://woprs.com:19079';
    expect(urlBuild(input)).toEqual(output);
  });
});
