// Camelize a string, cutting the string by multiple separators like hyphens, underscores and spaces.
// @param {text} String Text to camelize
// @return string Camelized text

const camelize = (text: string): string =>
  text.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
    if (p2) return p2.toUpperCase();

    return p1.toLowerCase();
  });

export default camelize;
