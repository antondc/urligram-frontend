import { match } from 'path-to-regexp';
import { regexRoute } from './allRoutes';

describe('All routes regex', () => {
  const testRegex = (route: string) => {
    const regexp = match(regexRoute);
    return regexp(route);
  };

  test('it should return the expected params', () => {
    const input = testRegex('/es/param');
    const output = {
      index: 0,
      params: {
        lang: 'es',
        firstparam: 'param',
      },
      path: '/es/param',
    };
    expect(input).toEqual(output);
  });

  test('it should return the expected params', () => {
    const input = testRegex('/es/firstparam/secondparam');
    const output = {
      index: 0,
      params: {
        lang: 'es',
        firstparam: 'firstparam',
        secondparam: 'secondparam',
      },
      path: '/es/firstparam/secondparam',
    };
    expect(input).toEqual(output);
  });

  test('it should return the expected params', () => {
    const input = testRegex('/first/secondparam');
    const output = {
      index: 0,
      params: {
        firstparam: 'first',
        secondparam: 'secondparam',
      },
      path: '/first/secondparam',
    };

    expect(input).toEqual(output);
  });

  test('it should return the expected params', () => {
    const input = testRegex('/en/firstparam/secondparam');
    const output = {
      index: 0,
      params: {
        lang: 'en',
        firstparam: 'firstparam',
        secondparam: 'secondparam',
      },
      path: '/en/firstparam/secondparam',
    };

    expect(input).toEqual(output);
  });

  test('it should return the expected params', () => {
    const input = testRegex('/en/firstparam/secondparam/thirdparam');
    const output = {
      index: 0,
      params: {
        lang: 'en',
        firstparam: 'firstparam',
        secondparam: 'secondparam',
        thirdparam: 'thirdparam',
      },
      path: '/en/firstparam/secondparam/thirdparam',
    };

    expect(input).toEqual(output);
  });

  test('it should return the expected params', () => {
    const input = testRegex('/en/1/2/3');
    const output = {
      index: 0,
      params: {
        lang: 'en',
        firstparam: '1',
        secondparam: '2',
        thirdparam: '3',
      },
      path: '/en/1/2/3',
    };

    expect(input).toEqual(output);
  });
  test('it should return the expected params', () => {
    const input = testRegex('/en/1/2/3');
    const output = {
      index: 0,
      params: {
        lang: 'en',
        firstparam: '1',
        secondparam: '2',
        thirdparam: '3',
      },
      path: '/en/1/2/3',
    };

    expect(input).toEqual(output);
  });
});
