export const LISTS_LOAD_REQUEST = 'LISTS_LOAD_REQUEST';
export const LISTS_LOAD_SUCCESS = 'LISTS_LOAD_SUCCESS';
export const LIST_LOAD_REQUEST = 'LIST_LOAD_REQUEST';
export const LIST_LOAD_SUCCESS = 'LIST_LOAD_SUCCESS';
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
  createdAt: number;
  updatedAt: number;
}

export interface ListsState {
  byKey: {
    [key: string]: ListState;
  };
  loading?: boolean;
  currentIds?: number[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: ListsError[];
}

export interface ListApiResponseItem {
  type: 'list';
  id: number;
  attributes: ListState;
}

export interface ListLoadApiResponse {
  data: ListApiResponseItem;
}

export interface ListsLoadApiResponse {
  data: ListApiResponseItem[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
}

export interface ListCreateApiRequest {
  listName: string;
  listDescription: string;
  listIsPrivate: boolean;
}

export interface ListCreateApiResponse {
  data: ListApiResponseItem;
}

interface ListsLoadRequestAction {
  type: typeof LISTS_LOAD_REQUEST;
  payload: Partial<ListsState>;
}

interface ListsLoadSuccessAction {
  type: typeof LISTS_LOAD_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListLoadRequestAction {
  type: typeof LIST_LOAD_REQUEST;
  payload: Partial<ListsState>;
}

interface ListLoadSuccessAction {
  type: typeof LIST_LOAD_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListCreateRequestAction {
  type: typeof LIST_CREATE_REQUEST;
  payload: Partial<ListsState>;
}

interface ListCreateSuccessAction {
  type: typeof LIST_CREATE_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListCreateFailureAction {
  type: typeof LIST_CREATE_FAILURE;
  payload: Partial<ListsState>;
}

interface ListCreateResetAction {
  type: typeof LIST_CREATE_RESET;
  payload: Partial<ListsState>;
}

export type ListsActions =
  | ListsLoadRequestAction
  | ListsLoadSuccessAction
  | ListLoadRequestAction
  | ListLoadSuccessAction
  | ListCreateRequestAction
  | ListCreateSuccessAction
  | ListCreateFailureAction
  | ListCreateResetAction;
