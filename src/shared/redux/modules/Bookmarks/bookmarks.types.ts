export const LOAD_BOOKMARKS_STARTED = 'LOAD_BOOKMARKS_STARTED';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';
export const VOTE_UPDATE_BOOKMARK_SUCCESS = 'VOTE_UPDATE_BOOKMARK_SUCCESS';
export const VOTE_UPDATE_BOOKMARK_START = 'VOTE_UPDATE_BOOKMARK_START';
export const BOOKMARK_CREATE_REQUEST = 'BOOKMARK_CREATE_REQUEST';
export const BOOKMARK_CREATE_SUCCESS = 'BOOKMARK_CREATE_SUCCESS';
export const BOOKMARK_CREATE_FAILURE = 'BOOKMARK_CREATE_FAILURE';
export const BOOKMARK_CREATE_RESET = 'BOOKMARK_CREATE_RESET';

export interface BookmarksError extends Error {
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
  errors?: BookmarksError[];
  bookmarkCreationLoading?: boolean;
  bookmarkCreationSuccess?: boolean;
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
    error: BookmarksError;
  };
}

export interface BookmarkCreateResetAction {
  type: typeof BOOKMARK_CREATE_RESET;
}

export type BookmarksActionsTypes =
  | RequestBookmarksAction
  | ReceiveBookmarksAction
  | VoteBookmarkRequest
  | VoteBookmarkReceive
  | BookmarkCreateRequestAction
  | BookmarkCreateSuccessAction
  | BookmarkCreateFailureAction
  | BookmarkCreateResetAction;
