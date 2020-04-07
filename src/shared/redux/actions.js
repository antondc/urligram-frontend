import C from './constants';
import fetch from 'isomorphic-fetch';
import { handleResponse } from '../tools/errors';
import mockDataOne from './modules/MockDataOne/data.json';
import mockDataTwo from './modules/MockDataTwo/data.json';
import languages from './modules/Language/data.json';

const actions = {
  requestLogIn: (username, password, history) => {
    // Request a cookie from api server using the fetch api
    const url = '/api/v1/login';
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return dispatch => {
      fetch(encodedURI, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: username,
          password: password,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then(handleResponse)
        .then(response => dispatch(actions.logIn(response.user)))
        .catch(error => dispatch(actions.logFailed(error)));
    };
  },

  requestLogOut: (username, password, history) => {
    // Remove the cookie on server using the fetch api
    const url = '/api/v1/login';
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return dispatch => {
      fetch(encodedURI, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(() => dispatch(actions.logOut()))
        .catch(error => dispatch(actions.logFailed(error)));
    };
  },

  logOut: () => {
    return {
      type: C.LOG_OUT,
      data: {},
    };
  },

  logIn: user => {
    return {
      type: C.LOG_IN,
      data: {
        ...user,
      },
    };
  },

  logFailed: error => {
    return {
      type: C.LOG_FAILED,
      data: {
        logged: false,
        message: error,
      },
    };
  },

  firstLoad: () => {
    return {
      type: C.FIRST_LOAD,
      data: {
        date: new Date(),
      },
    };
  },

  requestLanguages: () => {
    return {
      type: C.LOAD_LANGUAGES_STARTED,
    };
  },

  receiveLanguages: data => {
    return {
      type: C.LOAD_LANGUAGES_SUCCESS,
      data,
    };
  },

  loadLanguages: () => {
    if (isBrowser) {
      return dispatch => {
        dispatch(actions.requestLanguages());
        dispatch(actions.receiveLanguages(languages));
      };
    }
    return languages;
  },

  requestMockDataOne: () => {
    return {
      type: C.LOAD_MOCK_DATA_ONE_STARTED,
    };
  },

  receiveMockDataOne: data => {
    return {
      type: C.LOAD_MOCK_DATA_ONE_SUCCESS,
      data,
    };
  },

  loadMockDataOne: () => {
    if (isBrowser) {
      return dispatch => {
        dispatch(actions.requestMockDataOne());
        dispatch(actions.receiveMockDataOne(mockDataOne));
      };
    }
    return mockDataOne;
  },

  requestMockDataTwo: () => {
    return {
      type: C.LOAD_MOCK_DATA_TWO_STARTED,
    };
  },

  receiveMockDataTwo: data => {
    return {
      type: C.LOAD_MOCK_DATA_TWO_SUCCESS,
      data,
    };
  },

  loadMockDataTwo: () => {
    if (isBrowser) {
      return dispatch => {
        dispatch(actions.requestMockDataTwo());
        dispatch(actions.receiveMockDataTwo(mockDataTwo));
      };
    }
    return mockDataTwo;
  },
};

export default actions;
