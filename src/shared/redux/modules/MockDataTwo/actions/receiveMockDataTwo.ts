import {
  LOAD_MOCK_DATA_TWO_SUCCESS,
  MockDataTwosActionsTypes,
  MockDataTwoState,
} from 'Modules/MockDataTwo/mockDataTwo.types';

export const receiveMockDataTwo = (data: MockDataTwoState): MockDataTwosActionsTypes => ({
  type: LOAD_MOCK_DATA_TWO_SUCCESS,
  data: {
    ...data,
  },
});
