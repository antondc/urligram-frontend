import { validatePassword } from './validatePassword';

describe('validatePassword', () => {
  test('it should identify correct length', () => {
    expect(validatePassword('A2a4a6A8')).toBe(true);
  });
  test('it should identify incorrect length', () => {
    expect(validatePassword('A2bc6')).toBe(false);
  });
  test('it should identify presence of number', () => {
    expect(validatePassword('Abc3efgh')).toBe(true);
  });
  test('it should identify lack of number', () => {
    expect(validatePassword('Abcdefgh')).toBe(false);
  });
  test('it should identify presence of uppercase', () => {
    expect(validatePassword('Abcdefgh')).toBe(false);
  });
  test('it should identify lack of uppercase', () => {
    expect(validatePassword('abcdefgh')).toBe(false);
  });
  test('it should identify white spaces', () => {
    expect(validatePassword('Abc 1efgh')).toBe(false);
  });
});
