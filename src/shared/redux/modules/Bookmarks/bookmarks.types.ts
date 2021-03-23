export const LOAD_BOOKMARKS_STARTED = 'LOAD_BOOKMARKS_STARTED';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';
export const VOTE_UPDATE_BOOKMARK_SUCCESS = 'VOTE_UPDATE_BOOKMARK_SUCCESS';
export const VOTE_UPDATE_BOOKMARK_START = 'VOTE_UPDATE_BOOKMARK_START';
export const BOOKMARK_CREATE_REQUEST = 'BOOKMARK_CREATE_REQUEST';
export const BOOKMARK_CREATE_SUCCESS = 'BOOKMARK_CREATE_SUCCESS';
export const BOOKMARK_CREATE_FAILURE = 'BOOKMARK_CREATE_FAILURE';
export const BOOKMARK_CREATE_RESET = 'BOOKMARK_CREATE_RESET';
export const BOOKMARK_UPDATE_REQUEST = 'BOOKMARK_UPDATE_REQUEST';
export const BOOKMARK_UPDATE_SUCCESS = 'BOOKMARK_UPDATE_SUCCESS';
export const BOOKMARK_UPDATE_FAILURE = 'BOOKMARK_UPDATE_FAILURE';
export const BOOKMARK_UPDATE_RESET = 'BOOKMARK_UPDATE_RESET';

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
  bookmarkCreationLoading?: boolean;
  bookmarkCreationSuccess?: boolean;
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

interface RequestBookmarksAction {
  type: typeof LOAD_BOOKMARKS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveBookmarksAction {
  type: typeof LOAD_BOOKMARKS_SUCCESS;
  data: BookmarksState;
}

export interface VoteBookmarkRequest {
  type: typeof VOTE_UPDATE_BOOKMARK_START;
  payload: BookmarksState;
}

export interface VoteBookmarkReceive {
  type: typeof VOTE_UPDATE_BOOKMARK_SUCCESS;
  payload: BookmarkState;
}

export interface BookmarkCreateRequestAction {
  type: typeof BOOKMARK_CREATE_REQUEST;
  data: {
    bookmarkId?: number;
  };
}

export interface BookmarkCreateSuccessAction {
  type: typeof BOOKMARK_CREATE_SUCCESS;
  data: {
    originalBookmarkId: number;
    bookmark: BookmarkState;
  };
}

export interface BookmarkCreateFailureAction {
  type: typeof BOOKMARK_CREATE_FAILURE;
  data: {
    bookmarkCreationLoading: false;
    bookmarkCreationSuccess: false;
    bookmarkId: number;
    error: BookmarkError;
  };
}

export interface BookmarkCreateResetAction {
  type: typeof BOOKMARK_CREATE_RESET;
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
  type: typeof BOOKMARK_UPDATE_REQUEST;
}

export interface BookmarkUpdateSuccessAction {
  type: typeof BOOKMARK_UPDATE_SUCCESS;
  data: {
    bookmark: BookmarkState;
    bookmarkUpdateSuccess: true;
  };
}

export interface BookmarkUpdateFailureAction {
  type: typeof BOOKMARK_UPDATE_FAILURE;
  data: {
    error: BookmarkError;
    bookmarkUpdateSuccess: false;
  };
}

export interface BookmarkUpdateResetAction {
  type: typeof BOOKMARK_UPDATE_RESET;
  data: {
    bookmarkUpdateSuccess: undefined;
  };
}

export type BookmarksActionsTypes =
  | RequestBookmarksAction
  | ReceiveBookmarksAction
  | VoteBookmarkRequest
  | VoteBookmarkReceive
  | BookmarkCreateRequestAction
  | BookmarkCreateSuccessAction
  | BookmarkCreateFailureAction
  | BookmarkCreateResetAction
  | BookmarkUpdateRequestAction
  | BookmarkUpdateSuccessAction
  | BookmarkUpdateFailureAction
  | BookmarkUpdateResetAction;
