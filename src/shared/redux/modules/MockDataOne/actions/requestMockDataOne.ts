import { LOAD_MOCK_DATA_ONE_STARTED, MockDataOnesActionsTypes } from '../mockDataOne.types';

export const requestMockDataOne = (): MockDataOnesActionsTypes => {
  return {
    type: LOAD_MOCK_DATA_ONE_STARTED,
    data: {
      loading: true,
    },
  };
};
