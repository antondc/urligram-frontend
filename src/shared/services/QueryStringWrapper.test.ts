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
});
