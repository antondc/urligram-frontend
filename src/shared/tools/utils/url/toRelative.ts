// Transform given url into relative
// @param {content} string
// @returns string
export const toRelative = function (url) {
  return url.charAt(0) === '/' ? url.slice(1) : url;
};
