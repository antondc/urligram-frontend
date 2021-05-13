import { imageUrlSplitBySizes } from './imageUrlSplitBySizes';

describe('url images build', () => {
  test('it should return a default object if no sizes are present', () => {
    const imageUrl = 'www.google.com/patha/pathb/image.jpg';
    const sizes = undefined;
    const result = imageUrlSplitBySizes({
      imageUrl,
      sizes,
    });

    const expected = {
      original: 'www.google.com/patha/pathb/original/image.jpg',
    };
    expect(result).toEqual(expected);
  });

  test('it should return an empty object if no string is present', () => {
    const imageUrl = undefined;
    const sizes = undefined;
    const result = imageUrlSplitBySizes({
      imageUrl,
      sizes,
    });

    const expected = {};
    expect(result).toEqual(expected);
  });

  test('it should return proper object with strings', () => {
    const imageUrl = 'www.google.com/patha/pathb/image.jpg';
    const sizes = [
      {
        width: 100,
        height: 200,
      },
      {
        width: 300,
        height: 400,
      },
    ];
    const result = imageUrlSplitBySizes({
      imageUrl,
      sizes,
    });

    const expected = {
      original: 'www.google.com/patha/pathb/original/image.jpg',
      w100: 'www.google.com/patha/pathb/w100/image.jpg',
      h200: 'www.google.com/patha/pathb/h200/image.jpg',
      w300: 'www.google.com/patha/pathb/w300/image.jpg',
      h400: 'www.google.com/patha/pathb/h400/image.jpg',
    };
    expect(result).toEqual(expected);
  });
});
