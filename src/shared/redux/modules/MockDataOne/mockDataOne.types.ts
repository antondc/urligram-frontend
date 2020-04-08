export const LOAD_MOCK_DATA_ONE_STARTED = 'LOAD_MOCK_DATA_ONE_STARTED';
export const LOAD_MOCK_DATA_ONE_SUCCESS = 'LOAD_MOCK_DATA_ONE_SUCCESS';

export interface MockDataOneState {
  id: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface RequestMockDataOnesAction {
  type: typeof LOAD_MOCK_DATA_ONE_STARTED;
  data: {
    loading: boolean;
  };
}

interface ReceiveMockDataOnesAction {
  type: typeof LOAD_MOCK_DATA_ONE_SUCCESS;
  data: MockDataOneState;
}

export interface MockDataOneApiResponse {
  status: string;
  data: {
    MockDataOne: MockDataOneState;
  };
}

export type MockDataOnesActionsTypes = RequestMockDataOnesAction | ReceiveMockDataOnesAction;
