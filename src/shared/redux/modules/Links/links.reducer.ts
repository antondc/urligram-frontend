import {
  LINK_VOTE_STARTED,
  LINK_VOTE_SUCCESS,
  LinksState,
  LOAD_LINKS_STARTED,
  LOAD_LINKS_SUCCESS,
} from './links.types';

const initialState: LinksState = {
  byKey: {},
};

export const Links = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LINKS_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOAD_LINKS_SUCCESS:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        loading: false,
      });
    case LINK_VOTE_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LINK_VOTE_SUCCESS:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        loading: false,
      });
    default:
      return Object.assign({}, state);
  }
};
