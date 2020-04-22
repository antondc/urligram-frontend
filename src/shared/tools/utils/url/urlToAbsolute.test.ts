import urlToAbsolute from './urlToAbsolute';

describe('urlToAbsolute', () => {
  test('it should return a string with leading slash and no trailing slash', () => {
    const input = '/one/two/three/';
    const output = '/one/two/three';

    expect(urlToAbsolute(input)).toEqual(output);
  });
});
