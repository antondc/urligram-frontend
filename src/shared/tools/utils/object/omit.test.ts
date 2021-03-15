// http://blog.nicohaemhouts.com/2015/08/03/accessing-nested-javascript-objects-with-string-key/

import { omit } from './omit';

describe('omit', () => {
  test('it should return object with simple key removed', () => {
    const originalObject = {
      field1: 'value1',
      field2: {
        field21: [211, 212],
      },
    };
    const modifiedObject = {
      field2: {
        field21: [211, 212],
      },
    };

    expect(omit(originalObject, ['field1'])).toEqual(modifiedObject);
  });
  test('it should return object with flattened key removed', () => {
    const originalObject = {
      field1: 'value1',
      field2: {
        field21: [211, 212],
      },
    };
    const modifiedObject = {
      field1: 'value1',
      field2: {},
    };

    expect(omit(originalObject, ['field2.field21'])).toEqual(modifiedObject);
  });

  test('it should return object with flattened key removed removing elements from arrays', () => {
    const originalObject = {
      field1: 'value1',
      field2: {
        field21: [211, 212],
      },
    };
    const modifiedObject = {
      field1: 'value1',
      field2: {
        field21: [211, undefined],
      },
    };

    expect(omit(originalObject, ['field2.field21[1]'])).toEqual(modifiedObject);
  });
});
