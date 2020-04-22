// Camelize a string, cutting the string by multiple separators like hyphens, underscores and spaces.
// @param {text} String Text to camelize
// @return string Camelized text

const camelize = function (text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();

    return p1.toLowerCase();
  });
};

export default camelize;
