// Deep merge Objects and Arrays
// By default, if we want to remove elements, assign them as `null` or `undefined`

import { isArray } from './isArray';
import { isObject } from './isObject';

// With the `replaceArrays` flag set to true, arrays will be replaced by empty ones
// With the `replaceObjects` flag set to true, objects will be replaced by empty ones

type Options = {
  replaceArrays?: boolean;
  replaceObjects?: boolean;
};

export const mergeDeep = <T>(target: T, sources: Array<any>, { replaceArrays, replaceObjects }: Options = {}): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      // Object case
      if (isObject(source[key])) {
        // If is an object, deep merge it
        if (!target[key]) {
          // If there is no current key in the target, create it and skip
          Object.assign(target, { [key]: source[key] });
        } else if (!!replaceObjects) {
          // If there is key, and we want to replace it, do Object.assign
          Object.assign(target, { [key]: source[key] });
        } else {
          // If there is key, and we want do deepMerge it, do recursive mergeDeep
          mergeDeep(target[key], [source[key]], { replaceArrays, replaceObjects });
        }
      }

      // Array case
      if (isArray(source[key])) {
        if (replaceArrays) {
          // If is an array, and we DO NOT want to deep merge it with `!!replaceArrays` option—, we object.assign it, replacing it if empty
          Object.assign(target, { [key]: source[key] });
        } else {
          // If is an array, and we want to deep merge it —by default— with `!replaceArrays` option—, we merge it and remove duplicates with a Set
          Object.assign(target, {
            [key]: Array.from(new Set([...target[key], ...source[key]])),
          });
        }
      }

      // Neither Object nor Array casess
      if (!isObject(source[key]) && !isArray(source[key])) {
        // Simply replace it with Object.assign
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return Object.assign({}, mergeDeep(target, [...sources], { replaceArrays, replaceObjects }));
};
