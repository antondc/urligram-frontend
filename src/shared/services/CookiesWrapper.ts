import { isDomAvailable } from '@antoniodcorrea/utils-frontend';

export class CookiesWrapper {
  findCookie(cookieName: string): string | undefined {
    if (!isDomAvailable) return;

    const cookieStartsWith = cookieName + '=';
    const decodedCookies = decodeURIComponent(document.cookie);
    const decodedCookiesArray = decodedCookies.split(';');
    const cookiesArray = decodedCookiesArray.map((item) => item.trim());
    const cookie = cookiesArray.find((item) => item.startsWith(cookieStartsWith));

    return cookie;
  }

  getCookie(key: string): string {
    if (!isDomAvailable) return;

    const cookie = this.findCookie(key);
    if (!cookie) return;

    const cookieContent = cookie.split('=')[1];

    return cookieContent;
  }

  setCookie = (cookieName: string, content: string, expires?: number /* Ms since UNIX epoch */): void => {
    if (!isDomAvailable) return;

    const stringifiedContent = content;
    const date = new Date(expires);
    const dateString = 'expires=' + date.toUTCString();

    const cookie = cookieName + '=' + stringifiedContent + ';' + dateString + '; path=/';
    document.cookie = cookie;
  };

  removeCookie(cookieName: string): void {
    if (!isDomAvailable) return;

    const cookie = this.findCookie(cookieName);

    if (!cookie) return;

    const expiredDate = 'expires=' + 'Thu, 01 Jan 1970 00:00:00 UTC';
    const expiredCookie = cookieName + '=;' + expiredDate + '; path=/';

    document.cookie = expiredCookie;
  }
}
