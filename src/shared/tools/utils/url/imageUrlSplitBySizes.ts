type ImageUrlSplitBySizes = {
  imageUrl: string;
  sizes: {
    height: number;
    width: number;
  }[];
};

type ImageUrlSplitBySizesReturn = {
  [key: string]: string;
};

export const imageUrlSplitBySizes = ({ imageUrl, sizes = [] }: ImageUrlSplitBySizes): ImageUrlSplitBySizesReturn => {
  if (!imageUrl || !imageUrl.length) return {};

  // Split url in parts by slashes
  // to insert the size string
  const urlArray = imageUrl.split('/');
  const part1 = urlArray.slice(0, -1);
  const part2 = urlArray.slice(-1);

  // Default image object
  const accumulator = {
    original: `${part1.join('/')}/original/${part2.join('/')}`,
  };

  // Enhance default image object with urls with sizes
  const imageUrlWithSizes = sizes.reduce((acc, curr) => {
    Object.entries(curr).forEach(([key, value]) => {
      const keyFirstLetter = key[0];

      acc[`${keyFirstLetter}${value}`] = `${part1.join('/')}/${keyFirstLetter}${value}/${part2.join('/')}`;
    });

    return acc;
  }, accumulator);

  return imageUrlWithSizes;
};
