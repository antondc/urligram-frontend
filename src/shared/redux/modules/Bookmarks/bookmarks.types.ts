export const LOAD_BOOKMARKS_STARTED = 'LOAD_BOOKMARKS_STARTED';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';

export interface BookmarkState {
  id: number;
  title: string;
  url: string;
  img: string;
  tags: { id: number; name: string }[];
  vote?: boolean;
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
  status: string;
  data: {
    Bookmarks: BookmarksState;
  };
}

export type BookmarksActionsTypes = RequestBookmarksAction | ReceiveBookmarksAction;
