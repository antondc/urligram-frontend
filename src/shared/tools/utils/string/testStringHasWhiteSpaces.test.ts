import { testStringHasWhiteSpaces } from './testStringHasWhiteSpaces';

describe('testStringHasWhiteSpaces', () => {
  test('it should identify that string has no white spaces', () => {
    expect(testStringHasWhiteSpaces('abcdefg')).toBe(false);
  });
  test('it should identify that string has one white space', () => {
    expect(testStringHasWhiteSpaces('abc defg')).toBe(true);
  });
  test('it should identify that string has multiple white spaces', () => {
    expect(testStringHasWhiteSpaces('a b c d e f g')).toBe(true);
  });
});
