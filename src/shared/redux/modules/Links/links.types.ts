export const LOAD_LINKS_STARTED = 'LOAD_LINKS_STARTED';
export const LOAD_LINKS_SUCCESS = 'LOAD_LINKS_SUCCESS';
export const LINK_VOTE_STARTED = 'LINK_VOTE_STARTED';
export const VOTE_LINK_SUCCESS = 'VOTE_LINK_SUCCESS';

export interface LinkState {
  id: number;
  title: string;
  url: string;
  img: string;
  linkId: number;
  tags: {
    id: number;
    name: string;
  }[];
  statistics: {
    absoluteVote: number | null;
    timesVoted: number;
    averageVote: number | null;
    timesBookmarked: number;
    vote: boolean | null;
    loading: boolean | undefined;
  };
}

export interface LinksState {
  byKey: {
    [key: string]: LinkState;
  };
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
}

export interface VoteLinkRequest {
  type: typeof LINK_VOTE_STARTED;
  payload: LinksState;
}

export interface VoteLinkReceive {
  type: typeof VOTE_LINK_SUCCESS;
  payload: LinksState;
}

export type LinksActionsTypes = RequestLinksAction | ReceiveLinksAction | VoteLinkRequest | VoteLinkReceive;
