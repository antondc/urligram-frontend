import C from './constants';
import { LOG_IN_STARTED, LOG_IN_SUCCESS, LOG_OUT, LOG_FAILED } from './modules/User/user.types';

export const Languages = (state = [], action) => {
  switch (action.type) {
    case C.LOAD_LANGUAGES_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_LANGUAGES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.data.Languages,
      });
    default:
      return state;
  }
};

export const MockDataOne = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_MOCK_DATA_ONE_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_MOCK_DATA_ONE_SUCCESS:
      return Object.assign({}, state, {
        ...action.data.MockDataOne,
        isFetching: false,
      });
    default:
      return state;
  }
};

export const MockDataTwo = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_MOCK_DATA_TWO_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_MOCK_DATA_TWO_SUCCESS:
      return Object.assign({}, state, {
        ...action.data.MockDataTwo,
        isFetching: false,
      });
    default:
      return state;
  }
};

export const User = (state = '', action) => {
  switch (action.type) {
    case LOG_IN_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        ...action.data,
        loading: false,
      });
    case LOG_OUT || LOG_FAILED:
      return {};
    default:
      return state;
  }
};
