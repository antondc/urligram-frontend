export const BOOKMARKS_LOAD_REQUEST = 'BOOKMARKS_LOAD_REQUEST';
export const BOOKMARKS_LOAD_SUCCESS = 'BOOKMARKS_LOAD_SUCCESS';
export const BOOKMARKS_LOAD_FAILURE = 'BOOKMARKS_LOAD_FAILURE';
export const BOOKMARK_CREATE_REQUEST = 'BOOKMARK_CREATE_REQUEST';
export const BOOKMARK_CREATE_SUCCESS = 'BOOKMARK_CREATE_SUCCESS';
export const BOOKMARK_CREATE_FAILURE = 'BOOKMARK_CREATE_FAILURE';
export const BOOKMARK_UPDATE_REQUEST = 'BOOKMARK_UPDATE_REQUEST';
export const BOOKMARK_UPDATE_SUCCESS = 'BOOKMARK_UPDATE_SUCCESS';
export const BOOKMARK_UPDATE_FAILURE = 'BOOKMARK_UPDATE_FAILURE';
export const BOOKMARK_DELETE_REQUEST = 'BOOKMARK_DELETE_REQUEST';
export const BOOKMARK_DELETE_SUCCESS = 'BOOKMARK_DELETE_SUCCESS';
export const BOOKMARK_DELETE_FAILURE = 'BOOKMARK_DELETE_FAILURE';
export const BOOKMARKS_RECOMMENDED_REQUEST = 'BOOKMARKS_RECOMMENDED_REQUEST';
export const BOOKMARKS_RECOMMENDED_SUCCESS = 'BOOKMARKS_RECOMMENDED_SUCCESS';
export const BOOKMARKS_RECOMMENDED_FAILURE = 'BOOKMARKS_RECOMMENDED_FAILURE';
export const BOOKMARK_LOAD_BY_ID_REQUEST = 'BOOKMARK_LOAD_BY_ID_REQUEST';
export const BOOKMARK_LOAD_BY_ID_SUCCESS = 'BOOKMARK_LOAD_BY_ID_SUCCESS';
export const BOOKMARK_LOAD_BY_ID_FAILURE = 'BOOKMARK_LOAD_BY_ID_FAILURE';
export const BOOKMARKS_LOAD_BY_IDS_REQUEST = 'BOOKMARKS_LOAD_BY_IDS_REQUEST';
export const BOOKMARKS_LOAD_BY_IDS_SUCCESS = 'BOOKMARKS_LOAD_BY_IDS_SUCCESS';
export const BOOKMARKS_LOAD_BY_IDS_FAILURE = 'BOOKMARKS_LOAD_BY_IDS_FAILURE';
export const BOOKMARKS_ERRORS_CLEAR = 'BOOKMARKS_ERRORS_CLEAR';

export interface BookmarkError extends Error {
  field: string;
}

export type BookmarkRelated = {
  id: number;
  title: string;
  userId: string;
};

interface BookmarkStatistics {
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
  createdAt: number;
  updatedAt: number;
  users: string[];
  bookmarksRelated?: BookmarkRelated[];
  isPrivate: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  statistics: BookmarkStatistics;
  deleting?: boolean;
  loading?: boolean;
  bookmarkReceivedFrom: {
    senderId: string;
    receiverId: string;
    viewed: string;
  }[];
  bookmarkSentTo: {
    senderId: string;
    receiverId: string;
    viewed: string;
  }[];
  viewPending?: boolean;
}

export type BookmarksByKey = {
  [key: string]: BookmarkState;
};

export interface BookmarksState {
  byKey: BookmarksByKey;
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

export interface BookmarkGetApiResponse {
  data: BookmarkGetItemResponse;
  meta: {
    totalItems: number;
    sort: string;
  };
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
    attributes: {
      id: number;
    };
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

interface BookmarksLoadFailureAction {
  type: typeof BOOKMARKS_LOAD_FAILURE;
  payload: BookmarksState;
}

interface BookmarkCreateApiRequestAction {
  type: typeof BOOKMARK_CREATE_REQUEST;
  payload: BookmarksState;
}

interface BookmarkCreateSuccessAction {
  type: typeof BOOKMARK_CREATE_SUCCESS;
  payload: BookmarksState;
}

interface BookmarkCreateFailureAction {
  type: typeof BOOKMARK_CREATE_FAILURE;
  payload: BookmarksState;
}

interface BookmarkUpdateRequestAction {
  type: typeof BOOKMARK_UPDATE_REQUEST;
  payload: BookmarksState;
}

interface BookmarkUpdateSuccessAction {
  type: typeof BOOKMARK_UPDATE_SUCCESS;
  payload: BookmarksState;
}

interface BookmarkUpdateFailureAction {
  type: typeof BOOKMARK_UPDATE_FAILURE;
  payload: BookmarksState;
}

interface BookmarkDeleteRequestAction {
  type: typeof BOOKMARK_DELETE_REQUEST;
  payload: BookmarksState;
}

interface BookmarkDeleteSuccessAction {
  type: typeof BOOKMARK_DELETE_SUCCESS;
  payload: BookmarksState;
}

interface BookmarkDeleteFailureAction {
  type: typeof BOOKMARK_DELETE_FAILURE;
  payload: BookmarksState;
}

interface BookmarkRecommendedRequestAction {
  type: typeof BOOKMARKS_RECOMMENDED_REQUEST;
  payload: BookmarksState;
}

interface BookmarkRecommendedSuccessAction {
  type: typeof BOOKMARKS_RECOMMENDED_SUCCESS;
  payload: BookmarksState;
}

interface BookmarkRecommendedFailureAction {
  type: typeof BOOKMARKS_RECOMMENDED_FAILURE;
  payload: BookmarksState;
}

interface BookmarkLoadByIdRequestAction {
  type: typeof BOOKMARK_LOAD_BY_ID_REQUEST;
  payload: BookmarksState;
}

interface BookmarkLoadByIdSuccessAction {
  type: typeof BOOKMARK_LOAD_BY_ID_SUCCESS;
  payload: BookmarksState;
}

interface BookmarkLoadByIdFailureAction {
  type: typeof BOOKMARK_LOAD_BY_ID_FAILURE;
  payload: BookmarksState;
}

interface BookmarksLoadByIdsRequestAction {
  type: typeof BOOKMARKS_LOAD_BY_IDS_REQUEST;
  payload: BookmarksState;
}

interface BookmarksLoadByIdsSuccessAction {
  type: typeof BOOKMARKS_LOAD_BY_IDS_SUCCESS;
  payload: BookmarksState;
}

interface BookmarksLoadByIdsFailureAction {
  type: typeof BOOKMARKS_LOAD_BY_IDS_FAILURE;
  payload: BookmarksState;
}

interface BookmarksErrorsClearAction {
  type: typeof BOOKMARKS_ERRORS_CLEAR;
  payload: Partial<BookmarksState>;
}

export type BookmarksActions =
  | BookmarksLoadRequestAction
  | BookmarksLoadSuccessAction
  | BookmarksLoadFailureAction
  | BookmarkCreateApiRequestAction
  | BookmarkCreateSuccessAction
  | BookmarkCreateFailureAction
  | BookmarkUpdateRequestAction
  | BookmarkUpdateSuccessAction
  | BookmarkUpdateFailureAction
  | BookmarkDeleteRequestAction
  | BookmarkDeleteSuccessAction
  | BookmarkDeleteFailureAction
  | BookmarkRecommendedRequestAction
  | BookmarkRecommendedSuccessAction
  | BookmarkRecommendedFailureAction
  | BookmarkLoadByIdRequestAction
  | BookmarkLoadByIdSuccessAction
  | BookmarkLoadByIdFailureAction
  | BookmarksLoadByIdsRequestAction
  | BookmarksLoadByIdsSuccessAction
  | BookmarksLoadByIdsFailureAction
  | BookmarksErrorsClearAction;
