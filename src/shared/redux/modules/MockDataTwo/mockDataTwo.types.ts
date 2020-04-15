export const LOAD_MOCK_DATA_TWO_STARTED = 'LOAD_MOCK_DATA_TWO_STARTED';
export const LOAD_MOCK_DATA_TWO_SUCCESS = 'LOAD_MOCK_DATA_TWO_SUCCESS';

export interface MockDataTwoState {
  id: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  loading?: boolean;
}

interface RequestMockDataTwosAction {
  type: typeof LOAD_MOCK_DATA_TWO_STARTED;
  data: {
    loading: boolean;
  };
}

interface ReceiveMockDataTwosAction {
  type: typeof LOAD_MOCK_DATA_TWO_SUCCESS;
  data: MockDataTwoState;
}

export interface MockDataTwoApiResponse {
  status: string;
  data: {
    MockDataTwo: MockDataTwoState;
  };
}

export type MockDataTwosActionsTypes = RequestMockDataTwosAction | ReceiveMockDataTwosAction;
