import get from 'lodash/get';

type SerializerByKey = <T, K>(props: {
  data: Array<T>;
  keyPath?: string;
  contentPath?: string;
}) => {
  [key: string]: K;
};

export const serializerFromArrayToByKey: SerializerByKey = ({ data, keyPath, contentPath }) => {
  if (!data) return {};

  return data.reduce(
    (acc, curr) => ({
      ...acc,
      ...{
        [get(curr, keyPath, curr['id'])]: get(curr, contentPath, curr),
      },
    }),
    {}
  );
};
