export const LOAD_LISTS_STARTED = 'LOAD_LISTS_STARTED';
export const LOAD_LISTS_SUCCESS = 'LOAD_LISTS_SUCCESS';
export const LOAD_LIST_STARTED = 'LOAD_LIST_STARTED';
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS';

export interface ListState {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  image: string;
  bookmarksIds: number[];
  membersIds: string[];
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

export interface ReceiveListResponse {
  data: ReceiveListItem;
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

interface RequestListAction {
  type: typeof LOAD_LIST_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveListAction {
  type: typeof LOAD_LIST_SUCCESS;
  data: ListsState;
}

export type ListsActionsTypes = RequestListsAction | ReceiveListsAction | RequestListAction | ReceiveListAction;
