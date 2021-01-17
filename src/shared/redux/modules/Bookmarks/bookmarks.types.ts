export const LOAD_BOOKMARKS_STARTED = 'LOAD_BOOKMARKS_STARTED';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';
export const VOTE_UPDATE_BOOKMARK_SUCCESS = 'VOTE_UPDATE_BOOKMARK_SUCCESS';
export const VOTE_UPDATE_BOOKMARK_START = 'VOTE_UPDATE_BOOKMARK_START';

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
  title: string;
  url: string;
  img: string;
  linkId: number;
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

export interface ReceiveBookmarkItem {
  type: 'bookmark';
  id: number;
  attributes: BookmarkState;
}

export interface ReceiveBookmarksResponse {
  data: ReceiveBookmarkItem[];
}

export interface VoteBookmarkRequest {
  type: typeof VOTE_UPDATE_BOOKMARK_START;
  payload: BookmarksState;
}

export interface VoteBookmarkReceive {
  type: typeof VOTE_UPDATE_BOOKMARK_SUCCESS;
  payload: BookmarkState;
}

export type BookmarksActionsTypes =
  | RequestBookmarksAction
  | ReceiveBookmarksAction
  | VoteBookmarkRequest
  | VoteBookmarkReceive;
