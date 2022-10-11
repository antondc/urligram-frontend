export const LINK_LOAD_BY_ID_REQUEST = 'LINK_LOAD_BY_ID_REQUEST';
export const LINK_LOAD_BY_ID_SUCCESS = 'LINK_LOAD_BY_ID_SUCCESS';
export const LINK_LOAD_BY_ID_FAILURE = 'LINK_LOAD_BY_ID_FAILURE';

export interface LinkError extends Error {
  field: string;
}

export type LinkRelated = {
  id: number;
  title: string;
  userId: string;
};

interface LinkStatistics {
  absoluteVote: number | null;
  timesVoted: number;
  averageVote: number | null;
  timesBookmarked: number;
  vote: boolean | null;
}

export interface LinkState {
  id: number;
  url: string;
  title: string;
  img: string;
  favicon: string;
  description: string;
  language: string;
  bookmarksRelated: {
    id: number;
    title: string;
    userId: string;
  }[];
  statistics: LinkStatistics;
}

export type LinksByKey = {
  [key: string]: LinkState;
};

export interface LinksState {
  byKey: LinksByKey;
  currentIds?: number[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: LinkError[];
  bookmarkCreationLoading?: boolean;
  bookmarkCreationSuccess?: boolean;
  bookmarkUpdateSuccess?: boolean;
}

// Requests -------

export interface LinkGetItemResponse {
  type: 'bookmark';
  id: number;
  attributes: LinkState;
}

export interface LinkGetApiResponse {
  data: LinkGetItemResponse;
  meta: {
    totalItems: number;
    sort: string;
  };
}

interface LinkLoadByIdRequest {
  type: typeof LINK_LOAD_BY_ID_REQUEST;
  payload: LinksState;
}

interface LinkLoadByIdSuccess {
  type: typeof LINK_LOAD_BY_ID_SUCCESS;
  payload: LinksState;
}

interface LinkLoadByIdFailure {
  type: typeof LINK_LOAD_BY_ID_FAILURE;
  payload: LinksState;
}

export type LinksActions = LinkLoadByIdFailure | LinkLoadByIdRequest | LinkLoadByIdSuccess;
