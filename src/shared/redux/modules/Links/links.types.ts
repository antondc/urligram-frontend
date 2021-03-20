export const LOAD_LINKS_STARTED = 'LOAD_LINKS_STARTED';
export const LOAD_LINKS_SUCCESS = 'LOAD_LINKS_SUCCESS';
export const LINK_VOTE_STARTED = 'LINK_VOTE_STARTED';
export const VOTE_LINK_SUCCESS = 'VOTE_LINK_SUCCESS';
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

interface RequestLinksAction {
  type: typeof LOAD_LINKS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveLinksAction {
  type: typeof LOAD_LINKS_SUCCESS;
  data: LinksState;
}

export interface ReceiveLinkItem {
  type: 'links';
  id: number;
  attributes: LinkState;
}

export interface ReceiveLinkResponse {
  data: ReceiveLinkItem;
}

export interface ReceiveLinksResponse {
  data: ReceiveLinkItem[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

export interface VoteLinkRequest {
  type: typeof LINK_VOTE_STARTED;
  payload: LinksState;
}

export interface VoteLinkReceive {
  type: typeof VOTE_LINK_SUCCESS;
  payload: LinksState;
}

export interface LinkLoadByIdRequest {
  type: typeof LINK_LOAD_BY_ID_REQUEST;
  data: {
    linkId: number;
  };
}

export interface LinkLoadByIdSuccess {
  type: typeof LINK_LOAD_BY_ID_SUCCESS;
  data: LinkState;
}

export interface LinkLoadByIdFailure {
  type: typeof LINK_LOAD_BY_ID_FAILURE;
  data: {
    linkId: number;
    error: LinkError;
  };
}

export type LinksActionsTypes =
  | RequestLinksAction
  | ReceiveLinksAction
  | VoteLinkRequest
  | VoteLinkReceive
  | LinkLoadByIdRequest
  | LinkLoadByIdSuccess
  | LinkLoadByIdFailure;
