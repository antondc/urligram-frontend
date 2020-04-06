import C from './constants';
import fetch from 'isomorphic-fetch';
import { handleResponse } from '../tools/errors';

const actions = {
  requestLogIn: (username, password, history) => {
    // Request a cookie from api server using the fetch api
    const url = '/api/v1/login';
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return function(dispatch) {
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

    return function(dispatch) {
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

  requestLanguage: () => {
    return {
      type: C.LOAD_LANGUAGE_STARTED,
    };
  },

  receiveLanguage: data => {
    return {
      type: C.LOAD_LANGUAGE_SUCCESS,
      data,
    };
  },

  loadLanguage: params => {
    const url = '/api/v1/language/' + params.lang;
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return isBrowser
      ? function(dispatch) {
          dispatch(actions.requestLanguage());

          return fetch(encodedURI, {
            credentials: 'include',
          })
            .then(response => response.json())
            .then(data => dispatch(actions.receiveLanguage(data)));
        }
      : fetch(encodedURI, {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => Promise.reject(Error(error.message)));
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
    const url = '/api/v1/language/';
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return isBrowser
      ? function(dispatch) {
          dispatch(actions.requestLanguages());

          return fetch(encodedURI, {
            credentials: 'include',
          })
            .then(response => response.json())
            .then(data => dispatch(actions.receiveLanguages(data)));
        }
      : fetch(encodedURI, {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => Promise.reject(Error(error.message)));
  },

  startNavigatedRoute: params => {
    return {
      type: C.NAVIGATED_ROUTE_STARTED,
      data: params,
    };
  },

  setNavigatedRoute: params => {
    actions.startNavigatedRoute(params);

    return {
      type: C.NAVIGATED_ROUTE_FINISHED,
      data: params,
    };
  },

  requestHomePage: () => {
    return {
      type: C.LOAD_HOMEPAGE_STARTED,
    };
  },

  receiveHomePage: (id, data) => {
    return {
      type: C.LOAD_HOMEPAGE_SUCCESS,
      id,
      data,
    };
  },

  loadHomePage: () => {
    const url = '/api/v1/homepage/';
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);
    return isBrowser
      ? function(dispatch) {
          dispatch(actions.requestHomePage());

          return fetch(encodedURI, {
            credentials: 'include',
          })
            .then(response => response.json())
            .then(data => dispatch(actions.receiveHomePage(1, data)));
        }
      : fetch(encodedURI, {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => Promise.reject(Error(error.message)));
  },

  requestWhoPage: () => {
    return {
      type: C.LOAD_WHOPAGE_STARTED,
    };
  },

  receiveWhoPage: (id, data) => {
    return {
      type: C.LOAD_WHOPAGE_SUCCESS,
      id,
      data,
    };
  },

  loadWhoPage: () => {
    const url = '/api/v1/whopage/1';
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return isBrowser
      ? function(dispatch) {
          dispatch(actions.requestWhoPage());

          return fetch(encodedURI, {
            credentials: 'include',
          })
            .then(response => response.json())
            .then(data => dispatch(actions.receiveWhoPage(1, data)));
        }
      : fetch(encodedURI, {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => Promise.reject(Error(error.message)));
  },
};

export default actions;
