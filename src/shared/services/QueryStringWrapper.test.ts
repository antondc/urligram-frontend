import { QueryStringWrapper } from './QueryStringWrapper';

describe('QueryStringWrapper', () => {
  test('it should stringify a complex object', () => {
    const params = {
      field1: 'value1',
      field2: {
        field21: ['value211', 'value212'],
      },
      field3: 31,
      field4: [41],
    };
    const stringified = QueryStringWrapper.stringifyQueryParams(params);

    expect(stringified).toEqual(
      'field1=value1&field2[field21][]=value211&field2[field21][]=value212&field3=31&field4[]=41'
    );
  });

  test('it should stringify an undefined object', () => {
    const params = undefined;
    const stringified = QueryStringWrapper.stringifyQueryParams(params);

    expect(stringified).toEqual('');
  });

  test('it should parse a complex query string', () => {
    const queryString =
      'field1=value1&field2[field21][]=value211&field2[field21][]=value212&field2[field22]=value221&field3=31';
    const result = {
      field1: 'value1',
      field2: {
        field21: ['value211', 'value212'],
        field22: 'value221',
      },
      field3: 31,
    };
    const params = QueryStringWrapper.parseQueryString(queryString);

    expect(params).toEqual(result);
  });

  test('it should parse an undefined query string', () => {
    const queryString = undefined;
    const result = {};
    const params = QueryStringWrapper.parseQueryString(queryString);

    expect(params).toEqual(result);
  });

  test('it should parse an empty query string', () => {
    const queryString = '';
    const result = {};
    const params = QueryStringWrapper.parseQueryString(queryString);

    expect(params).toEqual(result);
  });

  test('it should extract a query string', () => {
    const url = 'http://example.com/one?one=two';
    const result = 'one=two';

    const queryString = QueryStringWrapper.extractQueryString(url);

    expect(queryString).toEqual(result);
  });

  test('it should extract a query string', () => {
    const url = 'example.com/one?one=two';
    const result = 'one=two';

    const queryString = QueryStringWrapper.extractQueryString(url);

    expect(queryString).toEqual(result);
  });

  test('it should extract a query string', () => {
    const url = '/example.com/one?one=two';
    const result = 'one=two';

    const queryString = QueryStringWrapper.extractQueryString(url);

    expect(queryString).toEqual(result);
  });

  test('it should extract a query string', () => {
    const url = '/example.com/one?one=two&three=four';
    const result = 'one=two&three=four';

    const queryString = QueryStringWrapper.extractQueryString(url);

    expect(queryString).toEqual(result);
  });

  test('it should extract a query string', () => {
    const url = '/example.com/one';
    const result = '';

    const queryString = QueryStringWrapper.extractQueryString(url);

    expect(queryString).toEqual(result);
  });

  test('it should return all params', () => {
    const urlString =
      'https://dev.linking.me/en/links?field1=value1&field2[field21][]=value211&field2[field21][]=value212';
    const queryString = QueryStringWrapper.extractQueryString(urlString);
    const params = QueryStringWrapper.parseQueryString(queryString);
    const output = {
      field1: 'value1',
      field2: {
        field21: ['value211', 'value212'],
      },
    };

    expect(params).toEqual(output);
  });

  test('it should upsert params', () => {
    const urlString =
      'https://dev.linking.me/en/links?field1=value1&field2[field21][]=value211&field2[field21][]=value212';
    const queryString = QueryStringWrapper.extractQueryString(urlString);
    const newParams = {
      field3: 'value3',
      field4: {
        field41: ['value41', 'value42'],
      },
    };
    const queryStringUpdated = QueryStringWrapper.upsertSearchParams(queryString, newParams);
    const updatedParam = QueryStringWrapper.getOneSearchParam(queryStringUpdated, 'field4.field41');

    expect(updatedParam).toEqual(['value41', 'value42']);
  });

  test('it should delete all occurence of one param at a field', () => {
    const urlString =
      'https://dev.linking.me/en/links?field1=value1&field2[field21][]=value211&field2[field21][]=value212&field2[field22][]=value221&field2[field22][]=value222';
    const queryString = QueryStringWrapper.extractQueryString(urlString);

    const originalParams = QueryStringWrapper.parseQueryString(queryString);
    const result = {
      field1: 'value1',
      field2: {
        field21: ['value211', 'value212'],
        field22: ['value221', 'value222'],
      },
    };
    expect(originalParams).toEqual(result);
    const queryStringWithoutRemovedValues = QueryStringWrapper.deleteSearchParam(queryString, 'field2.field21');
    const modifiedParams = QueryStringWrapper.parseQueryString(queryStringWithoutRemovedValues);
    const resultantParams = {
      field1: 'value1',
      field2: {
        field22: ['value221', 'value222'],
      },
    };
    expect(modifiedParams).toEqual(resultantParams);
    expect(queryStringWithoutRemovedValues).toEqual(
      'field1=value1&field2[field22][]=value221&field2[field22][]=value222'
    );
  });

  test('it should delete all occurence of one param at a field', () => {
    const urlString =
      'https://dev.linking.me/en/links?field1=value1&field2[field21][]=value211&field2[field21][]=value212&field2[field22][]=value221&field2[field22][]=value222';
    const queryString = QueryStringWrapper.extractQueryString(urlString);
    const param = QueryStringWrapper.getOneSearchParam(queryString, 'field2.field21');
    expect(param).toEqual(['value211', 'value212']);
  });

  test('it should overwrite existing params', () => {
    const urlString = 'https://dev.linking.me/en/links?field1[field12]=value121';
    const queryString = QueryStringWrapper.extractQueryString(urlString);
    const updatedQueryString = QueryStringWrapper.upsertSearchParams(queryString, {
      field1: { field12: 'value_modified' },
    });

    expect(updatedQueryString).toEqual('field1[field12]=value_modified');
  });

  test('it should overwrite existing params', () => {
    const urlString = 'https://dev.linking.me/en/links?a[]=1&a[]=2&b[c][]=1&b[c][]=2&b[d]=1';
    const queryString = QueryStringWrapper.extractQueryString(urlString);
    const queryStringUpdated = QueryStringWrapper.upsertSearchParams(queryString, { b: { c: [312] } });

    expect(queryStringUpdated).toEqual('a[]=1&a[]=2&b[c][]=312&b[d]=1');
  });

  test('it should add params without overwriting them', () => {
    const urlString =
      'https://dev.linking.me/en/links?field1=value1&field2[field21][]=value211&field2[field21][]=value212';
    const queryString = QueryStringWrapper.extractQueryString(urlString);
    const newParams = {
      field1: 'new-value',
      field4: {
        field41: ['value41', 'value42'],
      },
    };

    const queryStringUpdated = QueryStringWrapper.addSearchParamsNoReplace(queryString, newParams);

    expect(queryStringUpdated).toEqual(
      'field1=value1&field4[field41][]=value41&field4[field41][]=value42&field2[field21][]=value211&field2[field21][]=value212'
    );
  });
});
