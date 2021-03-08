// Returns the text from HTML string
// @param {html} string
// @returns String
// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript
// HTML Entity Decode https://stackoverflow.com/questions/5796718/html-entity-decode
// &amp;amp; malformed in XML https://stackoverflow.com/questions/18019716/is-ampamp-valid/25273781
// Remove spaces from string to check differences
export const getTextFromHtml = (html: string): string => {
  html = html.replace('&amp;amp;', '&');

  const element = document.createElement('div');
  html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
  html = html.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
  element.innerHTML = html;
  html = element.textContent;
  element.textContent = '';

  html = html.replace(/ /g, '');

  return html;
};
