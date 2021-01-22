export const LOAD_LISTS_STARTED = 'LOAD_LISTS_STARTED';
export const LOAD_LISTS_SUCCESS = 'LOAD_LISTS_SUCCESS';

export interface ListState {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  image: string;
  bookmarksIds: number[];
  members: {
    id: string;
    userRole: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ListsState {
  byKey: {
    [key: string]: ListState;
  };
  loading?: boolean;
  currentIds?: number[];
}

export interface ReceiveListItem {
  type: 'list';
  id: number;
  attributes: ListState;
}

export interface ReceiveListsResponse {
  data: ReceiveListItem[];
}

interface RequestListsAction {
  type: typeof LOAD_LISTS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveListsAction {
  type: typeof LOAD_LISTS_SUCCESS;
  data: ListsState;
}

export type ListsActionsTypes = RequestListsAction | ReceiveListsAction;
