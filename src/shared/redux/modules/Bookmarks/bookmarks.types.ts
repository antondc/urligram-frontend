export const LOAD_BOOKMARKS_STARTED = 'LOAD_BOOKMARKS_STARTED';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';

export interface BookmarkState {
  id: number;
  title: string;
  url: string;
  img: string;
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
  };
}

export interface BookmarksState {
  byKey: {
    [key: string]: BookmarkState;
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

export interface ReceiveBookmarksResponse {
  data: {
    type: 'bookmark';
    id: number;
    attributes: BookmarkState;
  }[];
}

export type BookmarksActionsTypes = RequestBookmarksAction | ReceiveBookmarksAction;
