// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

import { mergeDeep2 } from './mergeDeep2';

const target = {
  a: 1,
  b: {
    c: 1,
    d: [1, 2, 3],
    e: {
      f: {
        g: 1,
        h: 2,
      },
    },
  },
};

describe('mergeDeep2', () => {
  test('it should deepmerge without replacing objects nor arrays', () => {
    const source = {
      a: 1,
      b: {
        c: 1,
        d: [1000],
        e: {
          f: {
            i: 3,
          },
        },
      },
    };

    const expectedResult = {
      a: 1,
      b: {
        c: 1,
        d: [1, 2, 3, 1000],
        e: {
          f: {
            g: 1,
            h: 2,
            i: 3,
          },
        },
      },
    };

    expect(mergeDeep2(target, [source])).toEqual(expectedResult);
  });

  test('it should deepmerge object replacing objects', () => {
    const source = {
      a: 1,
      b: {
        c: 1,
        d: {
          e: {
            f: [1, 2, 3],
            g: {},
          },
        },
      },
    };

    const expectedResult = {
      a: 1,
      b: {
        c: 1,
        d: {
          e: {
            f: [1, 2, 3],
            g: {},
          },
        },
      },
    };

    expect(mergeDeep2(target, [source], { replaceEmptyObjects: true })).toEqual(expectedResult);
  });

  test('it should deepmerge object replacing arrays', () => {
    const source = {
      a: 1,
      b: {
        c: 1,
        d: [1000],
        e: {
          f: {
            g: 1,
            h: 2,
          },
        },
      },
    };

    const expectedResult = {
      a: 1,
      b: {
        c: 1,
        d: [1000],
        e: {
          f: {
            g: 1,
            h: 2,
          },
        },
      },
    };

    expect(mergeDeep2(target, [source], { replaceEmptyArrays: true })).toEqual(expectedResult);
  });

  test('it should deepmerge object replacing objects and arrays', () => {
    const source = {
      a: 1,
      b: {
        c: 1,
        d: [1000],
        e: {},
      },
    };

    const expectedResult = {
      a: 1,
      b: {
        c: 1,
        d: [1000],
        e: {},
      },
    };

    expect(mergeDeep2(target, [source], { replaceEmptyArrays: true, replaceEmptyObjects: true })).toEqual(
      expectedResult
    );
  });
});
