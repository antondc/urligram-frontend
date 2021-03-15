// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

import { mergeDeep } from './mergeDeep';

describe('mergeDeep', () => {
  test('it should deepmerge object properties and values', () => {
    const object1 = {
      a: 1,
      b: {
        c: 1,
      },
    };
    const object2 = {
      b: {
        d: {
          e: {
            f: 1,
          },
        },
      },
    };
    const mergedObject = {
      a: 1,
      b: {
        c: 1,
        d: {
          e: {
            f: 1,
          },
        },
      },
    };

    expect(mergeDeep(object1, object2)).toEqual(mergedObject);
  });

  test('it should replace arrays', () => {
    const object1 = {
      a: 1,
      b: {
        c: [1, 2, 3],
        d: 1,
      },
    };

    const object2 = {
      a: 1,
      b: {
        c: [4],
      },
    };

    const mergedObject = {
      a: 1,
      b: {
        c: [4],
        d: 1,
      },
    };

    expect(mergeDeep(object1, object2)).toEqual(mergedObject);
  });
});
