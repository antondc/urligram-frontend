import { LOAD_MOCK_DATA_ONE_SUCCESS, MockDataOnesActionsTypes,MockDataOneState } from 'Modules/MockDataOne/mockDataOne.types';

export const receiveMockDataOne = (data: MockDataOneState): MockDataOnesActionsTypes => ({
  type: LOAD_MOCK_DATA_ONE_SUCCESS,
  data: {
    ...data,
  },
});
