import { stringToDashCase } from './stringToDashCase';

describe('stringToDashCase', () => {
  test('it should transform uppercase strings to dash-case', () => {
    expect(stringToDashCase('HELLO')).toEqual('Hello');
  });
  test('it should respect first uppercased letters', () => {
    expect(stringToDashCase('HelloWorld')).toEqual('Hello-world');
  });
  test('it should uppercase first letter if they are not', () => {
    expect(stringToDashCase('helloWorld')).toEqual('Hello-world');
  });
  test('it should handle spaces', () => {
    expect(stringToDashCase('Hello world')).toEqual('Hello-world');
  });
  test('it should handle multiple spaces', () => {
    expect(stringToDashCase('Hello    world')).toEqual('Hello-world');
  });
  test('it should handle underscores', () => {
    expect(stringToDashCase('Hello_world')).toEqual('Hello-world');
  });
  test('it should handle special characters', () => {
    expect(stringToDashCase('Hello world %& `')).toEqual('Hello-world-%&-`');
  });
});
