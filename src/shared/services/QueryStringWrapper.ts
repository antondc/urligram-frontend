import { parse, stringify } from 'qs';

export class QueryStringWrapper {
  static decoder(str: string, a, b, type): string | number {
    if (!isNaN(Number(str)) && type === 'value') return Number(str);

    return decodeURI(str);
  }

  static parseQueryString(string: string): { [key: string]: unknown } {
    const queryParams = parse(string.replace(/^\?/, ''), {
      decoder: QueryStringWrapper.decoder,
    });

    return queryParams;
  }

  static stringifyQueryParams(params: { [key: string]: unknown }): string {
    const queryParams = stringify(params);

    return queryParams;
  }
}
