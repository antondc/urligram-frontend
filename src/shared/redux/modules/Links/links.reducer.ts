import {
  LINK_LOAD_BY_ID_FAILURE,
  LINK_LOAD_BY_ID_REQUEST,
  LINK_LOAD_BY_ID_SUCCESS,
  LINK_VOTE_STARTED,
  LinksActionsTypes,
  LinksState,
  LOAD_LINKS_STARTED,
  LOAD_LINKS_SUCCESS,
  VOTE_LINK_SUCCESS,
} from './links.types';

export const initialState: LinksState = {
  byKey: {},
};

export const Links = (state = initialState, action: LinksActionsTypes): LinksState => {
  switch (action.type) {
    case LOAD_LINKS_STARTED:
      return Object.assign({}, state, {
        loading: true,
        meta: {
          ...state.meta,
          sort: undefined,
        },
      });
    case LOAD_LINKS_SUCCESS:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        allIds: [...action.data.allIds],
        loading: false,
        meta: action.data.meta,
      });
    case LINK_VOTE_STARTED:
      return Object.assign({}, state, action.payload);
    case VOTE_LINK_SUCCESS:
      return Object.assign({}, state, action.payload);
    case LINK_LOAD_BY_ID_REQUEST:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          [action.data.linkId]: {
            ...state.byKey[action.data.linkId],
            loading: true,
          },
        },
      });
    case LINK_LOAD_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          [action.data.id]: action.data,
        },
      });
    case LINK_LOAD_BY_ID_FAILURE:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          [action.data.linkId]: {
            ...state.byKey[action.data.linkId],
            loading: undefined,
          },
        },
        errors: [...state?.errors, action?.data?.error],
      });

    default:
      return Object.assign({}, state);
  }
};
