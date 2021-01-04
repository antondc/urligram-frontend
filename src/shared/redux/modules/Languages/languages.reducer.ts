import {
  LanguagesState,
  LOAD_LANGUAGES_STARTED,
  LOAD_LANGUAGES_SUCCESS,
  SWITCH_CURRENT_LANGUAGE_RECEIVE,
  SWITCH_CURRENT_LANGUAGE_REQUEST,
} from './languages.types';

const initialState: LanguagesState = {
  byKey: {},
  currentLanguage: {
    id: 0,
    slug: '',
    name: '',
    isDefault: false,
    glossary: {
      Home: '',
      Login: '',
      LogOut: '',
      Control: '',
      NotFound: '',
      Tags: '',
      Trending: '',
      Lists: '',
      Bookmarks: '',
    },
  },
};

export const Languages = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LANGUAGES_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOAD_LANGUAGES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        ...action.data.Languages,
      });
    case SWITCH_CURRENT_LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        ...state,
        currentLanguage: {
          ...state.currentLanguage,
          ...action.data,
        },
      });
    case SWITCH_CURRENT_LANGUAGE_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        currentLanguage: action.data,
      });
    default:
      return Object.assign({}, state);
  }
};
