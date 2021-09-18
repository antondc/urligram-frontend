import {
  LANGUAGES_LOAD_REQUEST,
  LANGUAGES_LOAD_SUCCESS,
  LANGUAGES_SWITCH_CURRENT_REQUEST,
  LANGUAGES_SWITCH_CURRENT_SUCCESS,
  LanguagesActions,
  LanguagesState,
} from './languages.types';

const initialState: LanguagesState = {
  byKey: {},
  currentLanguage: {
    id: 0,
    order: 0,
    slug: '',
    name: '',
    isDefault: false,
    glossary: {
      home: '',
      login: '',
      logout: '',
      control: '',
      notFound: '',
      tags: '',
      trending: '',
      lists: '',
      allBookmarks: '',
      myBookmarks: '',
      bookmarks: '',
      links: '',
      myUser: '',
      users: '',
      following: '',
      followers: '',
      since: '',
      serverError: '',
    },
  },
};

export const Languages = (state = initialState, action: LanguagesActions): LanguagesState => {
  switch (action.type) {
    case LANGUAGES_LOAD_REQUEST:
    case LANGUAGES_LOAD_SUCCESS:
    case LANGUAGES_SWITCH_CURRENT_REQUEST:
    case LANGUAGES_SWITCH_CURRENT_SUCCESS:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
