import psl from 'psl';

import { addDefaultHttps } from 'Tools/utils/url/AddDefaultHttps';

const DEFAULT_URL = 'example.com';

export class URLWrapper {
  private readonly url: URL;
  private readonly host: string;
  private readonly path: string;
  private readonly searchParams: URLSearchParams;

  constructor(rawURL: string) {
    try {
      let formattedURL;

      // Test for cases when url is malformed
      switch (true) {
        case rawURL === '':
          formattedURL = DEFAULT_URL;
          break;
        case rawURL === '/':
          formattedURL = DEFAULT_URL;
          break;
        case rawURL.startsWith('/'):
          formattedURL = `${DEFAULT_URL}${rawURL}`;
          break;

        default:
          formattedURL = rawURL;
          break;
      }

      const URLWithProtocol = addDefaultHttps(formattedURL);

      const url = new URL(URLWithProtocol);

      this.url = url;
      this.host = url.hostname;
      this.path = url.pathname;
      this.searchParams = this.url.searchParams;
    } catch (err) {
      console.error('Un-parsable URL', err);
    }
  }

  getHref(): string | undefined {
    return this.url?.href;
  }

  getPathName(): string | undefined {
    return this.url.pathname;
  }

  getPath(): string | undefined {
    return this.path;
  }

  getDomain(): string | undefined {
    return this.host;
  }

  getDomainWithoutSubdomain(): string {
    return psl.get(this.url.hostname);
  }

  getSearchString(): string | undefined {
    return decodeURI(this.searchParams.toString());
  }

  getPathAndSearch(): string | undefined {
    return `${this.getPath()}?${this.getSearchString()}`;
  }

  getSearchParam(field: string): any {
    return this.searchParams.get(field);
  }

  upsertSearchParam(field: string, value: string | number): string {
    this.searchParams.set(field, String(value));

    return this.getSearchString();
  }

  deleteSearchParam(field: string): string {
    this.searchParams.delete(field);

    return this.getSearchString();
  }
}
