import {
  BOOKMARK_CREATE_FAILURE,
  BOOKMARK_CREATE_REQUEST,
  BOOKMARK_CREATE_RESET,
  BOOKMARK_CREATE_SUCCESS,
  BookmarksActionsTypes,
  BookmarksState,
  LOAD_BOOKMARKS_STARTED,
  LOAD_BOOKMARKS_SUCCESS,
  VOTE_UPDATE_BOOKMARK_START,
  VOTE_UPDATE_BOOKMARK_SUCCESS,
} from './bookmarks.types';

export const initialState: BookmarksState = {
  byKey: {},
  errors: [],
};

export const Bookmarks = (state = initialState, action: BookmarksActionsTypes): BookmarksState => {
  switch (action.type) {
    case LOAD_BOOKMARKS_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        meta: {
          ...state.meta,
          sort: undefined,
        },
      });

    case LOAD_BOOKMARKS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        currentIds: action.data.currentIds || state.currentIds,
        loading: false,
        meta: {
          ...state.meta,
          ...action.data.meta,
        },
      });

    case VOTE_UPDATE_BOOKMARK_START:
      return Object.assign({}, state, {
        ...state,
        ...action.payload,
      });

    case VOTE_UPDATE_BOOKMARK_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action.payload,
      });

    case BOOKMARK_CREATE_REQUEST:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          [action.data.bookmarkId]: {
            ...state.byKey[action.data.bookmarkId],
            bookmarkingLoading: true,
          },
        },
        bookmarkCreationLoading: true,
      });
    case BOOKMARK_CREATE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          [action.data.originalBookmarkId]: {
            ...state.byKey[action.data.originalBookmarkId],
            users: action.data.bookmark.users,
            bookmarkingLoading: undefined,
          },
        },
        bookmarkCreationLoading: false,
        bookmarkCreationSuccess: true,
      });
    case BOOKMARK_CREATE_FAILURE:
      return Object.assign({}, state, {
        ...state,
        ...action.data,
        byKey: {
          ...state.byKey,
          [action.data.bookmarkId]: {
            ...state.byKey[action.data.bookmarkId],
            bookmarkingLoading: undefined,
          },
        },
        errors: [...state.errors, action?.data?.error],
      });
    case BOOKMARK_CREATE_RESET:
      return Object.assign({}, state, {
        ...state,
        bookmarkCreationLoading: undefined,
        bookmarkCreationSuccess: undefined,
      });

    default:
      return Object.assign({}, state);
  }
};
