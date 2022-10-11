import {
  LINK_LOAD_BY_ID_FAILURE,
  LINK_LOAD_BY_ID_REQUEST,
  LINK_LOAD_BY_ID_SUCCESS,
  LinksActions,
  LinksState,
} from './links.types';

const initialState: LinksState = {
  byKey: {},
  errors: [],
};

export const Links = (state = initialState, action: LinksActions): LinksState => {
  switch (action.type) {
    case LINK_LOAD_BY_ID_REQUEST:
    case LINK_LOAD_BY_ID_SUCCESS:
    case LINK_LOAD_BY_ID_FAILURE:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
};
