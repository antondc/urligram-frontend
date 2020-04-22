// Camelcase to Underscore
// @param {string} String
// @returns String
const deCamelize = function (string) {
  return string.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

export default deCamelize;
