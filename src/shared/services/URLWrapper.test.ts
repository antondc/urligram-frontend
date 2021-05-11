import { URLWrapper } from './URLWrapper';

describe('URLWrapper', () => {
  test('it should return a full href', () => {
    const urlString =
      'https://dev.linking.me/en/bookmarks?field1=value1&field2[field211][]=value21&field2[field212][]=value22';
    const urlObject = new URLWrapper(urlString);
    const output =
      'https://dev.linking.me/en/bookmarks?field1=value1&field2[field211][]=value21&field2[field212][]=value22';

    expect(urlObject.getHref()).toEqual(output);
  });

  test('it should return all params', () => {
    const urlString =
      'https://dev.linking.me/en/bookmarks?field1=value1&field2[field21][]=value211&field2[field21][]=value212';
    const urlObject = new URLWrapper(urlString);
    const output = {
      field1: 'value1',
      field2: {
        field21: ['value211', 'value212'],
      },
    };

    expect(urlObject.getSearchParamAll()).toEqual(output);
  });

  test('it should upsert params', () => {
    const urlString =
      'https://dev.linking.me/en/bookmarks?field1=value1&field2[field21][]=value211&field2[field21][]=value212';
    const urlObject = new URLWrapper(urlString);
    const newParams = {
      field3: 'value3',
      field4: {
        field41: ['value41', 'value42'],
      },
    };
    urlObject.upsertSearchParams(newParams);
    expect(urlObject.getSearchParamOne('field4.field41')).toEqual(['value41', 'value42']);
  });

  test('it should delete all occurence of one param at a field', () => {
    const urlString =
      'https://dev.linking.me/en/bookmarks?field1=value1&field2[field21][]=value211&field2[field21][]=value212&field2[field22][]=value221&field2[field22][]=value222';
    const urlObject = new URLWrapper(urlString);

    const originalParams = urlObject.getSearchParamAll();
    const result = {
      field1: 'value1',
      field2: {
        field21: ['value211', 'value212'],
        field22: ['value221', 'value222'],
      },
    };
    expect(originalParams).toEqual(result);
    const queryString = urlObject.deleteSearchParam('field2.field21');
    const modifiedParams = urlObject.getSearchParamAll();
    const resultantParams = {
      field1: 'value1',
      field2: {
        field22: ['value221', 'value222'],
      },
    };
    expect(modifiedParams).toEqual(resultantParams);
    expect(queryString).toEqual('?field1=value1&field2[field22][]=value221&field2[field22][]=value222');
  });

  test('it should delete all occurence of one param at a field', () => {
    const urlString =
      'https://dev.linking.me/en/bookmarks?field1=value1&field2[field21][]=value211&field2[field21][]=value212&field2[field22][]=value221&field2[field22][]=value222';
    const urlObject = new URLWrapper(urlString);

    const param = urlObject.getSearchParamOne('field2.field21');
    expect(param).toEqual(['value211', 'value212']);
  });

  test('it should overwrite existing params', () => {
    const urlString = 'https://dev.linking.me/en/bookmarks?field1[field12]=value121';
    const urlObject = new URLWrapper(urlString);

    const queryString = urlObject.upsertSearchParams({ field1: { field12: 'value_modified' } });
    expect(queryString).toEqual('?field1[field12]=value_modified');
  });

  test('it should overwrite existing params', () => {
    const urlString = 'https://dev.linking.me/en/bookmarks?a[]=1&a[]=2&b[c][]=1&b[c][]=2&b[d]=1';
    const urlObject = new URLWrapper(urlString);

    const queryString = urlObject.upsertSearchParams({ b: { c: [312] } });

    expect(queryString).toEqual('?a[]=1&a[]=2&b[c][]=312&b[d]=1');
  });

  test('it should retrieve filename if exists', () => {
    const urlString = 'https://dev.linking.me/en/bookmarks/image.jpg';
    const urlObject = new URLWrapper(urlString);

    const filename = urlObject.getFilename();

    expect(filename).toEqual('image.jpg');
  });

  test('it should not retrieve filename if doesnt exists', () => {
    const urlString = 'https://dev.linking.me/en/bookmarks/';
    const urlObject = new URLWrapper(urlString);

    const filename = urlObject.getFilename();

    expect(filename).toEqual(undefined);
  });

  test('it should not retrieve filename if doesnt have extension', () => {
    const urlString = 'https://dev.linking.me/en/bookmarks/filename';
    const urlObject = new URLWrapper(urlString);

    const filename = urlObject.getFilename();

    expect(filename).toEqual(undefined);
  });
});
