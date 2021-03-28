export const BOOKMARKS_LOAD_REQUEST = 'BOOKMARKS_LOAD_REQUEST';
export const BOOKMARKS_LOAD_SUCCESS = 'BOOKMARKS_LOAD_SUCCESS';
export const BOOKMARK_UPDATE_VOTE_SUCCESS = 'BOOKMARK_UPDATE_VOTE_SUCCESS';
export const BOOKMARK_UPDATE_VOTE_REQUEST = 'BOOKMARK_UPDATE_VOTE_REQUEST';
export const BOOKMARK_CREATE_REQUEST = 'BOOKMARK_CREATE_REQUEST';
export const BOOKMARK_CREATE_SUCCESS = 'BOOKMARK_CREATE_SUCCESS';
export const BOOKMARK_CREATE_FAILURE = 'BOOKMARK_CREATE_FAILURE';
export const BOOKMARK_UPDATE_REQUEST = 'BOOKMARK_UPDATE_REQUEST';
export const BOOKMARK_UPDATE_SUCCESS = 'BOOKMARK_UPDATE_SUCCESS';
export const BOOKMARK_UPDATE_FAILURE = 'BOOKMARK_UPDATE_FAILURE';
export const BOOKMARK_DELETE_SUCCESS = 'BOOKMARK_DELETE_SUCCESS';
export const BOOKMARK_DELETE_FAILURE = 'BOOKMARK_DELETE_FAILURE';

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
  order?: number;
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

// Requests -------

export interface BookmarkGetItemResponse {
  type: 'bookmark';
  id: number;
  attributes: BookmarkState;
}

export interface BookmarksGetApiResponse {
  data: BookmarkGetItemResponse[];
  meta: {
    totalItems: number;
    sort: string;
  };
}

export interface BookmarkCreateApiRequest {
  bookmarkId?: number;
  title?: string;
  url?: string;
  isPrivate?: boolean;
  tags?: {
    tag: string;
  }[];
}

export interface BookmarkCreateApiResponse {
  data: {
    attributes: BookmarkState;
  };
}

export interface BookmarkDeleteApiResponse {
  data: {
    attributes: BookmarkState;
  };
}

export interface BookmarkUpdateApiRequest {
  bookmarkId: number;
  order: number;
  title: string;
  isPrivate: boolean;
  tags: {
    tag: string;
  }[];
}

export interface BookmarkUpdateApiResponse {
  data: {
    attributes: BookmarkState;
  };
}

// Actions -----

interface BookmarksLoadRequestAction {
  type: typeof BOOKMARKS_LOAD_REQUEST;
  payload: BookmarksState;
}

interface BookmarksLoadSuccessAction {
  type: typeof BOOKMARKS_LOAD_SUCCESS;
  payload: BookmarksState;
}

export interface BookmarkVoteRequestAction {
  type: typeof BOOKMARK_UPDATE_VOTE_REQUEST;
  payload: BookmarksState;
}

export interface BookmarkVoteSuccessAction {
  type: typeof BOOKMARK_UPDATE_VOTE_SUCCESS;
  payload: BookmarksState;
}

export interface BookmarkCreateApiRequestAction {
  type: typeof BOOKMARK_CREATE_REQUEST;
  payload: BookmarksState;
}

export interface BookmarkCreateSuccessAction {
  type: typeof BOOKMARK_CREATE_SUCCESS;
  payload: BookmarksState;
}

export interface BookmarkCreateFailureAction {
  type: typeof BOOKMARK_CREATE_FAILURE;
  payload: BookmarksState;
}

export interface BookmarkUpdateRequestAction {
  type: typeof BOOKMARK_UPDATE_REQUEST;
  payload: BookmarksState;
}

export interface BookmarkUpdateSuccessAction {
  type: typeof BOOKMARK_UPDATE_SUCCESS;
  payload: BookmarksState;
}

export interface BookmarkUpdateFailureAction {
  type: typeof BOOKMARK_UPDATE_FAILURE;
  payload: BookmarksState;
}

export interface BookmarkDeleteSuccessAction {
  type: typeof BOOKMARK_DELETE_SUCCESS;
  payload: BookmarksState;
}

export interface BookmarkDeleteFailureAction {
  type: typeof BOOKMARK_DELETE_FAILURE;
  payload: BookmarksState;
}

export type BookmarksActions =
  | BookmarksLoadRequestAction
  | BookmarksLoadSuccessAction
  | BookmarkVoteRequestAction
  | BookmarkVoteSuccessAction
  | BookmarkCreateApiRequestAction
  | BookmarkCreateSuccessAction
  | BookmarkCreateFailureAction
  | BookmarkUpdateRequestAction
  | BookmarkUpdateSuccessAction
  | BookmarkUpdateFailureAction
  | BookmarkDeleteSuccessAction
  | BookmarkDeleteFailureAction;
