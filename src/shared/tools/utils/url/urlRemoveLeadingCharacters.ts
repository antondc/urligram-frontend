export const urlRemoveLeadingCharacters = (string: string): string => {
  const replacedString = string.replace(/^[^a-zA-Z]+/, '');

  return replacedString;
};
