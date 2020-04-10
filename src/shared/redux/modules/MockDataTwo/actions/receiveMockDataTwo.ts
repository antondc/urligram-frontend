import {
  LOAD_MOCK_DATA_TWO_SUCCESS,
  MockDataTwoState,
  MockDataTwosActionsTypes,
} from 'Modules/MockDataTwo/mockDataTwo.types';

export const receiveMockDataTwo = (data: MockDataTwoState): MockDataTwosActionsTypes => {
  return {
    type: LOAD_MOCK_DATA_TWO_SUCCESS,
    data: {
      ...data,
    },
  };
};
