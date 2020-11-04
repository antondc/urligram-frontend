import { LOAD_MOCK_DATA_TWO_STARTED, MockDataTwosActionsTypes } from 'Modules/MockDataTwo/mockDataTwo.types';

export const requestMockDataTwo = (): MockDataTwosActionsTypes => ({
  type: LOAD_MOCK_DATA_TWO_STARTED,
  data: {
    loading: true,
  },
});
