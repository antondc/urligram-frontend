import { numberLikeToNumber } from './numberLikeToNumber';

describe('numberLikeToNumber', () => {
  test('it should convert a number like value to number', () => {
    expect(numberLikeToNumber('1')).toEqual(1);
  });
  test('it should not convert a string value to number', () => {
    expect(numberLikeToNumber('myString')).toEqual('myString');
  });
  test('it should convert a number like key to number', () => {
    expect(numberLikeToNumber('1')).toEqual(1);
  });
  test('it should not convert a string key to number', () => {
    expect(numberLikeToNumber('myString')).toEqual('myString');
  });
});
