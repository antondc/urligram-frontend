type Key = number | string;

export const serializerFromArrayToByKey = <T extends { id: number | string }>(
  data: Array<T>
): {
  [key in Key]: T;
} => data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr } }), {});
