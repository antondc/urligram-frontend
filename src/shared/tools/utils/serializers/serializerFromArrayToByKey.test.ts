import { serializerFromArrayToByKey } from './serializerFromArrayToByKey';

const originalData = [
  {
    id: 1,
    name: 'text1',
    nestedProperties: {
      data: 'data1',
    },
  },
  {
    id: 2,
    name: 'text2',
    nestedProperties: {
      data: 'data2',
    },
  },
];

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with default key', () => {
    const serializedByKey = {
      1: {
        id: 1,
        name: 'text1',
        nestedProperties: {
          data: 'data1',
        },
      },
      2: {
        id: 2,
        name: 'text2',
        nestedProperties: {
          data: 'data2',
        },
      },
    };

    expect(serializerFromArrayToByKey({ data: originalData })).toEqual(serializedByKey);
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with custom key', () => {
    const serializedByKey = {
      ['text1']: {
        id: 1,
        name: 'text1',
        nestedProperties: {
          data: 'data1',
        },
      },
      ['text2']: {
        id: 2,
        name: 'text2',
        nestedProperties: {
          data: 'data2',
        },
      },
    };

    expect(serializerFromArrayToByKey({ data: originalData, keyPath: 'name' })).toEqual(serializedByKey);
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with custom content', () => {
    const serializedByKey = {
      1: {
        data: 'data1',
      },
      2: {
        data: 'data2',
      },
    };

    expect(serializerFromArrayToByKey({ data: originalData, contentPath: 'nestedProperties' })).toEqual(
      serializedByKey
    );
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with custom key and content', () => {
    const serializedByKey = {
      ['text1']: {
        data: 'data1',
      },
      ['text2']: {
        data: 'data2',
      },
    };

    expect(
      serializerFromArrayToByKey({ data: originalData, keyPath: 'name', contentPath: 'nestedProperties' })
    ).toEqual(serializedByKey);
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with default key if custom key does not exist', () => {
    const serializedByKey = {
      1: {
        id: 1,
        name: 'text1',
        nestedProperties: {
          data: 'data1',
        },
      },
      2: {
        id: 2,
        name: 'text2',
        nestedProperties: {
          data: 'data2',
        },
      },
    };

    expect(serializerFromArrayToByKey({ data: originalData, keyPath: 'dont-exist' })).toEqual(serializedByKey);
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with nested key', () => {
    const serializedByKey = {
      ['data1']: {
        id: 1,
        name: 'text1',
        nestedProperties: {
          data: 'data1',
        },
      },
      ['data2']: {
        id: 2,
        name: 'text2',
        nestedProperties: {
          data: 'data2',
        },
      },
    };

    expect(serializerFromArrayToByKey({ data: originalData, keyPath: 'nestedProperties.data' })).toEqual(
      serializedByKey
    );
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with nested content', () => {
    const serializedByKey = {
      1: 'data1',
      2: 'data2',
    };

    expect(serializerFromArrayToByKey({ data: originalData, contentPath: 'nestedProperties.data' })).toEqual(
      serializedByKey
    );
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should serialize with nested key and content', () => {
    const serializedByKey = {
      ['data1']: 'data1',
      ['data2']: 'data2',
    };

    expect(
      serializerFromArrayToByKey({
        data: originalData,
        keyPath: 'nestedProperties.data',
        contentPath: 'nestedProperties.data',
      })
    ).toEqual(serializedByKey);
  });
});

describe('serializerFromArrayToByKey', () => {
  test('it should return empty object when data is not present', () => {
    const serializedByKey = {};

    expect(serializerFromArrayToByKey({ data: undefined })).toEqual(serializedByKey);
  });
});
