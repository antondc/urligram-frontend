// Transform given url into absolute
// @param {url} string
// @returns string
export const toAbsolute = (url: string): string => (url && url[0] !== '/' ? '/' + url : url);
