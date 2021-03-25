export const LINKS_LOAD_REQUEST = 'LINKS_LOAD_REQUEST';
export const LINKS_LOAD_SUCCESS = 'LINKS_LOAD_SUCCESS';
export const LINK_VOTE_REQUEST = 'LINK_VOTE_REQUEST';
export const LINK_VOTE_SUCCESS = 'LINK_VOTE_SUCCESS';
export const LINK_LOAD_BY_ID_REQUEST = 'LINK_LOAD_BY_ID_REQUEST';
export const LINK_LOAD_BY_ID_FAILURE = 'LINK_LOAD_BY_ID_FAILURE';
export const LINK_LOAD_BY_ID_SUCCESS = 'LINK_LOAD_BY_ID_SUCCESS';

export type LinkError = Error;

export interface LinkState {
  id: number;
  title: string;
  url: string;
  img: string;
  favicon: string;
  description: string;
  language: string;
  linkId: number;
  tags: {
    id: number;
    name: string;
  }[];
  users: string[];
  createdAt: string;
  updatedAt: string;
  statistics: {
    absoluteVote: number | null;
    timesVoted: number;
    averageVote: number | null;
    timesBookmarked: number;
    vote: boolean | null;
    loading: boolean | undefined;
  };
  loading?: boolean;
}

export interface LinksState {
  byKey: {
    [key: string]: LinkState;
  };
  loading?: boolean;
  allIds?: number[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: LinkError[];
}

export interface LinkApiResponseItem {
  type: 'links';
  id: number;
  attributes: LinkState;
}

export interface LinkApiResponse {
  data: LinkApiResponseItem;
}

export interface LinksApiResponse {
  data: LinkApiResponseItem[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

interface LinksLoadRequestAction {
  type: typeof LINKS_LOAD_REQUEST;
  payload: Partial<LinksState>;
}

interface LinksLoadSuccessAction {
  type: typeof LINKS_LOAD_SUCCESS;
  payload: Partial<LinksState>;
}

export interface LinkVoteRequestAction {
  type: typeof LINK_VOTE_REQUEST;
  payload: Partial<LinksState>;
}

export interface LinkVoteSuccessAction {
  type: typeof LINK_VOTE_SUCCESS;
  payload: Partial<LinksState>;
}

export interface LinkLoadByIdRequestAction {
  type: typeof LINK_LOAD_BY_ID_REQUEST;
  payload: Partial<LinksState>;
}

export interface LinkLoadByIdSuccessAction {
  type: typeof LINK_LOAD_BY_ID_SUCCESS;
  payload: Partial<LinksState>;
}

export interface LinkLoadByIdFailureAction {
  type: typeof LINK_LOAD_BY_ID_FAILURE;
  payload: Partial<LinksState>;
}

export type LinksActions =
  | LinksLoadRequestAction
  | LinksLoadSuccessAction
  | LinkVoteRequestAction
  | LinkVoteSuccessAction
  | LinkLoadByIdRequestAction
  | LinkLoadByIdSuccessAction
  | LinkLoadByIdFailureAction;
