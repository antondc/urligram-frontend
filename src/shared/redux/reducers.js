import C from './constants';

export const HomePage = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_HOMEPAGE_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_HOMEPAGE_SUCCESS:
      return Object.assign({}, state, {
        ...action.data.HomePage,
        isFetching: false,
      });
    default:
      return state;
  }
};

export const Languages = (state = [], action) => {
  switch (action.type) {
    case C.LOAD_LANGUAGES_STARTED:
      return Object.assign([], state, {});
    case C.LOAD_LANGUAGES_SUCCESS:
      return Object.assign([], state, {
        ...action.data.Languages,
      });

    default:
      return state;
  }
};

export const User = (state = '', action) => {
  switch (action.type) {
    case C.LOG_IN:
      return action.data;
    case C.LOG_OUT:
      return action.data;
    case C.LOG_FAILED:
      return action.data;
    default:
      return state;
  }
};

export const WhatPage = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_WHATPAGE_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_WHATPAGE_SUCCESS:
      return Object.assign({}, state, {
        ...action.data.WhatPage,
        isFetching: false,
      });
    default:
      return state;
  }
};

export const WhoPage = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_WHOPAGE_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_WHOPAGE_SUCCESS:
      return Object.assign({}, state, {
        ...action.data.WhoPage,
        isFetching: false,
      });
    default:
      return state;
  }
};
