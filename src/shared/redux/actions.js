import C from './constants';
import { v4 } from 'uuid';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';
const cookies1 = new Cookies();
const cookies = new Cookies();
import { handleResponse } from '../tools/errors';
const config = require('../../../config.test.json');

const actions = {
  requestToken: (username, password, history) => {
    // Get a token from api server using the fetch api
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
        body: JSON.stringify({
          name: username,
          password: password,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then(handleResponse)
        .then(response => {
          cookies.addChangeListener(function() {
            cookies.removeChangeListener();
            history.push('/control');
          });
          const user = { ...response.user, logged: true };
          cookies.set('sessionToken', response.token, {
            maxAge: config.SESSION_DURATION,
            path: '/',
          });
          cookies.set('sessionUser', user, {
            maxAge: config.SESSION_DURATION,
            path: '/',
          });

          return dispatch(actions.logIn(user));
        })
        .catch(error => {
          return dispatch(actions.logFailed(error));
        });
    };
  },

  logOut: () => {
    cookies.remove('sessionToken', { path: '/' });
    cookies.remove('sessionUser', { path: '/' });
    return {
      type: C.LOG_OUT,
      data: {
        logged: false,
      },
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

  loadLanguage: lang => {
    const url = '/api/v1/language/' + lang;
    const encodedURI = isBrowser
      ? encodeURI(process.env.ENDPOINT_API + url)
      : encodeURI(process.env.ENDPOINT_API + url);

    return isBrowser
      ? function(dispatch) {
          dispatch(actions.requestLanguage());

          return fetch(encodedURI, {
            credentials: 'include',
          })
            .then(
              response => {
                return response.json();
              },
              error => {
                return console.log('An error occurred.', error);
              }
            )
            .then(data => {
              return dispatch(actions.receiveLanguage(data));
            });
        }
      : fetch(encodedURI, {
          credentials: 'include',
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            return Promise.reject(Error(error.message));
          });
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
            .then(
              response => {
                return response.json();
              },
              error => {
                return console.log('An error occurred.', error);
              }
            )
            .then(data => {
              return dispatch(actions.receiveLanguages(data));
            });
        }
      : fetch(encodedURI, {
          credentials: 'include',
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            return Promise.reject(Error(error.message));
          });
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
};

export default actions;
