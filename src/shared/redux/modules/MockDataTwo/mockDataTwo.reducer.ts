import {
  LOAD_MOCK_DATA_TWO_STARTED,
  LOAD_MOCK_DATA_TWO_SUCCESS,
  MockDataTwosActionsTypes,
  MockDataTwoState,
} from './mockDataTwo.types';

const initialState: MockDataTwoState = {
  id: undefined,
  order: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  loading: undefined,
};

export const MockDataTwo = (state = initialState, action: MockDataTwosActionsTypes): MockDataTwoState => {
  switch (action.type) {
    case LOAD_MOCK_DATA_TWO_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOAD_MOCK_DATA_TWO_SUCCESS:
      return Object.assign({}, state, {
        ...action.data,
        loading: false,
      });
    default:
      return Object.assign({}, state);
  }
};
