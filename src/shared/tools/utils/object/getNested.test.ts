// http://blog.nicohaemhouts.com/2015/08/03/accessing-nested-javascript-objects-with-string-key/

import { getNested } from './getNested';

const object = {
  id: '0001',
  name: 'Cake',
  batters: {
    batter: [
      { id: '1001', type: 'Regular' },
      { id: '1002', type: 'Chocolate' },
      { id: '1003', type: 'Blueberry' },
    ],
  },
  'key with space 1': {
    'key with space 2': 23,
  },
};

describe('getNested', () => {
  test('it should return correct length of a array', () => {
    expect(getNested<[]>(object, 'batters.batter').length).toEqual(3);
  });
  test('it should return correct object', () => {
    expect(getNested<string>(object, 'batters.batter.2.id')).toEqual('1003');
  });
  test('it should return correct object', () => {
    expect(getNested<string>(object, 'batters.batter[1].id')).toEqual('1002');
  });
  test('it should return correct object', () => {
    expect(getNested<number>(object, 'batters.batter[99].id') || 0).toEqual(0);
  });
  test('it should return correct object', () => {
    expect(getNested<undefined>(object, 'batters.batter.noKey')).toEqual(undefined);
  });
  test('it should return correct object', () => {
    expect(getNested<string>(object, 'batters.batter.0.id')).toEqual('1001');
  });
  test('it should return correct object using custom separator', () => {
    expect(getNested<string>(object, 'batters/batter/0/id', '/')).toEqual('1001');
  });
  test('it should return correct object from keys with spaces', () => {
    expect(getNested<number>(object, 'key with space 1.key with space 2')).toEqual(23);
  });
});
