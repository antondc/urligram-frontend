import { validateEmailAddress } from './validateEmailAddress';

describe('validateEmailAddress', () => {
  test('it should identify wrong mail address', () => {
    expect(validateEmailAddress('hello@')).toBe(false);
  });
  test('it should identify wrong mail address', () => {
    expect(validateEmailAddress('hello@example')).toBe(false);
  });
  test('it should identify correct mail address', () => {
    expect(validateEmailAddress('hello@example.com')).toBe(true);
  });
});
