// Validates password with
// — No white spaces
// — At least one upper case English letter, (?=.*?[A-Z])
// — At least one lower case English letter, (?=.*?[a-z])
// — At least one digit, (?=.*?[0-9])
// — Minimum eight in length .{8,} (with the anchors)

import { testStringHasWhiteSpaces } from './testStringHasWhiteSpaces';

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/;

  const passwordValid = passwordRegex.test(password);
  const stringDontHaveWhiteSpaces = !testStringHasWhiteSpaces(password);

  return passwordValid && stringDontHaveWhiteSpaces;
};
