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

export const Language = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_LANGUAGE_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case C.LOAD_LANGUAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.data.Language,
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

export const NavigatedRoute = (state = {}, action) => {
  switch (action.type) {
    case C.NAVIGATED_ROUTE_STARTED:
      return Object.assign({}, state, {
        resolved: false,
        ...action.data,
      });
    case C.NAVIGATED_ROUTE_FINISHED:
      return Object.assign({}, state, {
        ...action.data,
        resolved: true,
      });
    default:
      return state;
  }
};

export const UserSession = (state = '', action) => {
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

export const FirstLoad = (state = {}, action) => {
  switch (action.type) {
    case 'FIRST_LOAD':
      return Object.assign({}, state, {
        ...action.data,
      });
    default:
      return state;
  }
};
