// Transform given url into absolute
// @param {url} string
// @returns string
export const toAbsolute = function (url) {
  return url && url[0] !== '/' ? '/' + url : url;
};
