// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

import { mergeDeep } from './mergeDeep';

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

describe('mergeDeep', () => {
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

    expect(mergeDeep(target, [source])).toEqual(expectedResult);
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

    expect(mergeDeep(target, [source], { replaceObjects: true })).toEqual(expectedResult);
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

    expect(mergeDeep(target, [source], { replaceArrays: true })).toEqual(expectedResult);
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

    expect(mergeDeep(target, [source], { replaceArrays: true, replaceObjects: true })).toEqual(expectedResult);
  });
});
