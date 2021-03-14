import { testStringIsValidUrl } from './testStringIsValidUrl';

const valid = [
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://✪df.ws/123',
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  'http://192.168.1.1/',
  'http://192.168.1.1:8080/',
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://☺.damowmow.com/',
  'http://code.example.com/events/#&product=browser',
  'http://j.mp',
  'ftp://foo.bar/baz',
  'torrent://foo.bar/baz',
  'image://foo.bar:993',
  'irc://foo.bar:6667',
];

const invalid = [
  'rdar://1234',
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'foo.com',
  'http://-a.b.co',
  'http://a.b-.co',
];

describe('testStringIsValidUrl', () => {
  valid.forEach((item) => {
    test(`it should test ${item}`, () => {
      expect(testStringIsValidUrl(item)).toEqual(true);
    });
  });

  invalid.forEach((item) => {
    test(`it should test ${item}`, () => {
      expect(testStringIsValidUrl(item)).toEqual(false);
    });
  });
});
