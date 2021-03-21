export const LOAD_LISTS_STARTED = 'LOAD_LISTS_STARTED';
export const LOAD_LISTS_SUCCESS = 'LOAD_LISTS_SUCCESS';
export const LOAD_LIST_STARTED = 'LOAD_LIST_STARTED';
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS';
export const LIST_CREATE_REQUEST = 'LIST_CREATE_REQUEST';
export const LIST_CREATE_SUCCESS = 'LIST_CREATE_SUCCESS';
export const LIST_CREATE_FAILURE = 'LIST_CREATE_FAILURE';
export const LIST_CREATE_RESET = 'LIST_CREATE_RESET';

export interface ListsError extends Error {
  field: string;
}

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
  listCreationSuccess?: boolean;
  currentIds?: number[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: ListsError[];
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
  meta?: {
    totalItems?: number;
    sort?: string;
  };
}

export interface CreateListRequest {
  listName: string;
  listDescription: string;
  listIsPrivate: boolean;
}

export interface CreateListResponse {
  data: ReceiveListItem;
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

interface ListCreateRequestAction {
  type: typeof LIST_CREATE_REQUEST;
}

interface ListCreateSuccessAction {
  type: typeof LIST_CREATE_SUCCESS;
  data: {
    list: ListState;
  };
}

interface ListCreateFailure {
  type: typeof LIST_CREATE_FAILURE;
  data: {
    error: ListsError;
  };
}

interface ListCreateReset {
  type: typeof LIST_CREATE_RESET;
}

export type ListsActionsTypes =
  | RequestListsAction
  | ReceiveListsAction
  | RequestListAction
  | ReceiveListAction
  | ListCreateRequestAction
  | ListCreateSuccessAction
  | ListCreateFailure
  | ListCreateReset;
