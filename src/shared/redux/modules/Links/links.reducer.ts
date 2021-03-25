import {
  LINK_LOAD_BY_ID_FAILURE,
  LINK_LOAD_BY_ID_REQUEST,
  LINK_LOAD_BY_ID_SUCCESS,
  LINK_VOTE_REQUEST,
  LINK_VOTE_SUCCESS,
  LINKS_LOAD_REQUEST,
  LINKS_LOAD_SUCCESS,
  LinksActions,
  LinksState,
} from './links.types';

export const initialState: LinksState = {
  byKey: {},
};

export const Links = (state = initialState, action: LinksActions): LinksState => {
  switch (action.type) {
    case LINKS_LOAD_REQUEST:
    case LINKS_LOAD_SUCCESS:
    case LINK_VOTE_REQUEST:
    case LINK_VOTE_SUCCESS:
    case LINK_LOAD_BY_ID_REQUEST:
    case LINK_LOAD_BY_ID_SUCCESS:
    case LINK_LOAD_BY_ID_FAILURE:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
