export const types = {
  LOAD_BOOKMARKS_STARTED: 'LOAD_BOOKMARKS_STARTED',
  LOAD_BOOKMARKS_SUCCESS: 'LOAD_BOOKMARKS_SUCCESS',
  VOTE_UPDATE_BOOKMARK_SUCCESS: 'VOTE_UPDATE_BOOKMARK_SUCCESS',
  VOTE_UPDATE_BOOKMARK_START: 'VOTE_UPDATE_BOOKMARK_START',
  BOOKMARK_CREATE_REQUEST: 'BOOKMARK_CREATE_REQUEST',
  BOOKMARK_CREATE_SUCCESS: 'BOOKMARK_CREATE_SUCCESS',
  BOOKMARK_CREATE_FAILURE: 'BOOKMARK_CREATE_FAILURE',
  BOOKMARK_CREATE_RESET: 'BOOKMARK_CREATE_RESET',
  BOOKMARK_UPDATE_REQUEST: 'BOOKMARK_UPDATE_REQUEST',
  BOOKMARK_UPDATE_SUCCESS: 'BOOKMARK_UPDATE_SUCCESS',
  BOOKMARK_UPDATE_FAILURE: 'BOOKMARK_UPDATE_FAILURE',
  BOOKMARK_UPDATE_RESET: 'BOOKMARK_UPDATE_RESET',
};

export interface BookmarkError extends Error {
  field: string;
}

export interface LinkStatistics {
  absoluteVote: number | null;
  timesVoted: number;
  averageVote: number | null;
  timesBookmarked: number;
  vote: boolean | null;
  loading: boolean | undefined;
}

export interface BookmarkState {
  id: number;
  userId: string;
  title: string;
  url: string;
  img: string;
  favicon: string;
  linkId: number;
  createdAt: string;
  updatedAt: string;
  users: string[];
  isPrivate: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  statistics: LinkStatistics;
  bookmarkingLoading: boolean;
}

export interface BookmarksState {
  byKey: {
    [key: string]: BookmarkState;
  };
  currentIds?: number[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: BookmarkError[];
  bookmarkUpdateSuccess?: boolean;
}

export interface ReceiveBookmarkItem {
  type: 'bookmark';
  id: number;
  attributes: BookmarkState;
}

export interface ReceiveBookmarksResponse {
  data: ReceiveBookmarkItem[];
  meta: {
    totalItems: number;
    sort: string;
  };
}

export interface BookmarkCreateRequest {
  bookmarkId?: number;
  linkId?: number;
  title?: string;
  url?: string;
  isPrivate?: boolean;
  tags?: {
    tag: string;
  }[];
}

export interface BookmarkCreateResponse {
  data: {
    attributes: BookmarkState;
  };
}

interface LoadBookmarksRequestAction {
  type: typeof types.LOAD_BOOKMARKS_STARTED;
  payload: {
    loading: true;
    meta: {
      sort: undefined;
    };
  };
}

interface LoadBookmarksSuccesAction {
  type: typeof types.LOAD_BOOKMARKS_SUCCESS;
  payload: BookmarksState;
}

export interface VoteBookmarkRequest {
  type: typeof types.VOTE_UPDATE_BOOKMARK_START;
  payload: BookmarksState;
}

export interface VoteBookmarkReceive {
  type: typeof types.VOTE_UPDATE_BOOKMARK_SUCCESS;
  payload: BookmarkState;
}

export interface BookmarkCreateRequestAction {
  type: typeof types.BOOKMARK_CREATE_REQUEST;
  payload: {
    byKey: {
      [key: number]: {
        bookmarkingLoading: true;
      };
    };
  };
}

export interface BookmarkCreateSuccessAction {
  type: typeof types.BOOKMARK_CREATE_SUCCESS;
  payload: {
    byKey: {
      [key: number]: {
        users: string[];
        bookmarkingLoading: undefined;
      };
    };
  };
}

export interface BookmarkCreateFailureAction {
  type: typeof types.BOOKMARK_CREATE_FAILURE;
  payload: {
    bookmarkId: number;
    error: BookmarkError;
  };
}

export interface BookmarkUpdateRequest {
  bookmarkId: number;
  order: number;
  title: string;
  isPrivate: boolean;
  tags: {
    tag: string;
  }[];
}

export interface BookmarkUpdateResponse {
  data: {
    attributes: BookmarkState;
  };
}

export interface BookmarkUpdateRequestAction {
  type: typeof types.BOOKMARK_UPDATE_REQUEST;
  payload: undefined;
}

export interface BookmarkUpdateSuccessAction {
  type: typeof types.BOOKMARK_UPDATE_SUCCESS;
  payload: {
    byKey: {
      [key: number]: BookmarkState;
    };
    bookmarkUpdateSuccess: true;
  };
}

export interface BookmarkUpdateFailureAction {
  type: typeof types.BOOKMARK_UPDATE_FAILURE;
  payload: {
    errors: BookmarkError[];
    bookmarkUpdateSuccess: false;
  };
}

export interface BookmarkUpdateResetAction {
  type: typeof types.BOOKMARK_UPDATE_RESET;
  payload: {
    bookmarkUpdateSuccess: undefined;
  };
}

export type BookmarksActions =
  | LoadBookmarksRequestAction
  | LoadBookmarksSuccesAction
  | VoteBookmarkRequest
  | VoteBookmarkReceive
  | BookmarkCreateRequestAction
  | BookmarkCreateSuccessAction
  | BookmarkCreateFailureAction
  | BookmarkUpdateRequestAction
  | BookmarkUpdateSuccessAction
  | BookmarkUpdateFailureAction
  | BookmarkUpdateResetAction;
