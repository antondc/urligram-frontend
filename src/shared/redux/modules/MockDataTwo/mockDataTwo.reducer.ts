import { LOAD_MOCK_DATA_TWO_STARTED, LOAD_MOCK_DATA_TWO_SUCCESS } from './mockDataTwo.types';

export const MockDataTwo = (state = {}, action) => {
  switch (action.type) {
    case LOAD_MOCK_DATA_TWO_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case LOAD_MOCK_DATA_TWO_SUCCESS:
      return Object.assign({}, state, {
        ...action.data,
        isFetching: false,
      });
    default:
      return state;
  }
};
