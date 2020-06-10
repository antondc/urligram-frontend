import { LOAD_LINKS_STARTED, LOAD_LINKS_SUCCESS, LinksState } from './links.types';

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
        ...action.data.Links,
        loading: false,
      });
    default:
      return Object.assign({}, state);
  }
};
