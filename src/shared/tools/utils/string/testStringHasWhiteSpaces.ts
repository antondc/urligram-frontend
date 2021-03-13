export const testStringHasWhiteSpaces = (string: string): boolean => {
  const regex = /\s/g;

  const stringHasWhiteSpaces = regex.test(string);

  return stringHasWhiteSpaces;
};
