import { parse, stringify } from 'qs';

export class QueryStringWrapper {
  static decoder(str: string, defaultDecoder, b, type: string): string | number | string[] | number[] {
    if (type === 'value' && !isNaN(Number(str))) return Number(str);

    return decodeURIComponent(defaultDecoder(str));
  }

  static parseQueryString(string: string): { [key: string]: unknown } {
    const queryParams = parse(string.replace(/^\?/, ''), {
      decoder: QueryStringWrapper.decoder,
    });

    return queryParams;
  }

  static stringifyQueryParams(params: { [key: string]: unknown } | any): string {
    const queryParams = stringify(params, {
      arrayFormat: 'brackets',
    });

    return decodeURIComponent(queryParams);
  }
}
