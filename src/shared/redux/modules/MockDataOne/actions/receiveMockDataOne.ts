import { LOAD_MOCK_DATA_ONE_SUCCESS, MockDataOneState, MockDataOnesActionsTypes } from 'Modules/MockDataOne/mockDataOne.types';

export const receiveMockDataOne = (data: MockDataOneState): MockDataOnesActionsTypes => {
  return {
    type: LOAD_MOCK_DATA_ONE_SUCCESS,
    data: {
      ...data,
    },
  };
};
