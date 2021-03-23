import {
  BOOKMARK_CREATE_FAILURE,
  BOOKMARK_CREATE_REQUEST,
  BOOKMARK_CREATE_RESET,
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_UPDATE_FAILURE,
  BOOKMARK_UPDATE_REQUEST,
  BOOKMARK_UPDATE_RESET,
  BOOKMARK_UPDATE_SUCCESS,
  BOOKMARK_UPDATE_VOTE_START,
  BOOKMARK_UPDATE_VOTE_SUCCESS,
  BOOKMARKS_LOAD_REQUEST,
  BOOKMARKS_LOAD_SUCCESS,
  BookmarksActions,
  BookmarksState,
} from './bookmarks.types';

export const initialState: BookmarksState = {
  byKey: {},
  errors: [],
};

export const Bookmarks = (state = initialState, action: BookmarksActions): BookmarksState => {
  switch (action.type) {
    case BOOKMARKS_LOAD_REQUEST:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        meta: {
          ...state.meta,
          sort: undefined,
        },
      });

    case BOOKMARKS_LOAD_SUCCESS:
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

    case BOOKMARK_UPDATE_VOTE_START:
      return Object.assign({}, state, {
        ...state,
        ...action.payload,
      });

    case BOOKMARK_UPDATE_VOTE_SUCCESS:
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
        errors: [...state?.errors, action?.data?.error],
      });
    case BOOKMARK_CREATE_RESET:
      return Object.assign({}, state, {
        ...state,
        bookmarkCreationLoading: undefined,
        bookmarkCreationSuccess: undefined,
      });

    case BOOKMARK_UPDATE_REQUEST:
      return Object.assign({}, state, {
        ...state,
      });
    case BOOKMARK_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          [action.data.bookmark?.id]: action.data.bookmark,
        },
        bookmarkUpdateSuccess: action.data.bookmarkUpdateSuccess,
      });
    case BOOKMARK_UPDATE_FAILURE:
      return Object.assign({}, state, {
        ...state,
        ...action.data,
        errors: [...state?.errors, action?.data?.error],
        bookmarkUpdateSuccess: action.data.bookmarkUpdateSuccess,
      });
    case BOOKMARK_UPDATE_RESET:
      return Object.assign({}, state, {
        ...state,
        bookmarkUpdateSuccess: action.data.bookmarkUpdateSuccess,
      });

    default:
      return Object.assign({}, state);
  }
};
