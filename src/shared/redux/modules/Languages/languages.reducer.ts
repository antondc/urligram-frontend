import { LOAD_LANGUAGES_STARTED, LOAD_LANGUAGES_SUCCESS, LanguagesState } from './languages.types';

const initialState: LanguagesState = {
  byKey: {},
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
    default:
      return state;
  }
};
