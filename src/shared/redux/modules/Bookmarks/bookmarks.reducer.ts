import {
  BookmarksState,
  LOAD_BOOKMARKS_STARTED,
  LOAD_BOOKMARKS_SUCCESS,
  VOTE_BOOKMARK_START,
  VOTE_UPDATE_BOOKMARK_SUCCESS,
} from './bookmarks.types';

const initialState: BookmarksState = {
  byKey: {},
};

export const Bookmarks = (state = initialState, action) => {
  const linkId = action?.data?.linkId;
  const bookmarkIdsByLinkId = Object.values(state?.byKey).filter((item) => item?.linkId === linkId) || [];

  switch (action.type) {
    case LOAD_BOOKMARKS_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case LOAD_BOOKMARKS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        loading: false,
      });
    case VOTE_BOOKMARK_START:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...bookmarkIdsByLinkId.reduce(
            (acc, curr) => ({
              ...acc,
              ...{
                [curr.id]: {
                  ...curr,
                  statistics: {
                    ...curr.statistics,
                    loading: true,
                  },
                },
              },
            }),
            {}
          ),
        },
      });
    case VOTE_UPDATE_BOOKMARK_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...bookmarkIdsByLinkId.reduce(
            (acc, curr) => ({
              ...acc,
              ...{
                [curr.id]: {
                  ...curr,
                  statistics: {
                    ...curr.statistics,
                    ...action.data.statistics,
                    loading: false,
                  },
                },
              },
            }),
            {}
          ),
        },
      });
    default:
      return Object.assign({}, state);
  }
};
