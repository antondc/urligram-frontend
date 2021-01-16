import {
  LOAD_MOCK_DATA_ONE_STARTED,
  LOAD_MOCK_DATA_ONE_SUCCESS,
  MockDataOnesActionsTypes,
  MockDataOneState,
} from './mockDataOne.types';

const initialState: MockDataOneState = {
  id: undefined,
  order: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const MockDataOne = (state = initialState, action: MockDataOnesActionsTypes): MockDataOneState => {
  switch (action.type) {
    case LOAD_MOCK_DATA_ONE_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOAD_MOCK_DATA_ONE_SUCCESS:
      return Object.assign({}, state, {
        ...action.data,
        loading: false,
      });
    default:
      return Object.assign({}, state);
  }
};
