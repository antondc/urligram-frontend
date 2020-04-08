import { LOAD_MOCK_DATA_ONE_STARTED, LOAD_MOCK_DATA_ONE_SUCCESS } from './mockDataOne.types';

export const MockDataOne = (state = {}, action) => {
  switch (action.type) {
    case LOAD_MOCK_DATA_ONE_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case LOAD_MOCK_DATA_ONE_SUCCESS:
      return Object.assign({}, state, {
        ...action.data,
        isFetching: false,
      });
    default:
      return state;
  }
};
