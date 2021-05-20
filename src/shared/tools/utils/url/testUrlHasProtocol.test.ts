import { testUrlHasProtocol } from './testUrlHasProtocol';

const valid = [
  'http://foo.com/blah_blah',
  'https://✪df.ws/123',
  'ftp://foo.bar/baz',
  'torrent://foo.bar/baz',
  'image://foo.bar:993',
  'irc://foo.bar:6667',
  'rdar://1234',
  'rdar://subexample.example.com',
  'http://example.com',
  'http://example.com/path1/path2?hello=1&hello=2',
  'http://a',
  'https://a',
  'http://abc',
  'http://',
];

const invalid = [
  '//',
  '//a',
  '///a',
  '///',
  'http:///example.com',
  'mailto:example.com',
  'foo.com',
  'www.example.com',
  'example.com',
  'http://exa mple.com',
  'http:/example.com',
  'http://exampl e.com',
  'http:// exampl e.com',
  'http://example.com ',
  'http:// example.com',
  'http:///www.example.com',
];

describe('testUrlHasProtocol', () => {
  valid.forEach((item) => {
    test(`it should test ${item}`, () => {
      expect(testUrlHasProtocol(item)).toEqual(true);
    });
  });

  invalid.forEach((item) => {
    test(`it should test ${item}`, () => {
      expect(testUrlHasProtocol(item)).toEqual(false);
    });
  });
});
