import { urlRemoveLeadingCharacters } from './urlRemoveLeadingCharacters';

describe('urlRemoveLeadingCharacters', () => {
  test('/one/two/three/', () => {
    const originalUrl = '/one/two/three/';
    const output = 'one/two/three/';

    expect(urlRemoveLeadingCharacters(originalUrl)).toEqual(output);
  });
  test(':/one/two/three/', () => {
    const originalUrl = ':/one/two/three/';
    const output = 'one/two/three/';

    expect(urlRemoveLeadingCharacters(originalUrl)).toEqual(output);
  });
  test('~/one/two/three/', () => {
    const originalUrl = '~/one/two/three/';
    const output = 'one/two/three/';

    expect(urlRemoveLeadingCharacters(originalUrl)).toEqual(output);
  });
  test('~//one/two/three/', () => {
    const originalUrl = '~//one/two/three/';
    const output = 'one/two/three/';

    expect(urlRemoveLeadingCharacters(originalUrl)).toEqual(output);
  });
  test('//:one/two/three/', () => {
    const originalUrl = '//:one/two/three/';
    const output = 'one/two/three/';

    expect(urlRemoveLeadingCharacters(originalUrl)).toEqual(output);
  });
});
