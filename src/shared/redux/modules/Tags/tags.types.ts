import { UnknownAction } from 'redux';

export const TAGS_LOAD_REQUEST = 'TAGS_LOAD_REQUEST';
export const TAGS_LOAD_SUCCESS = 'TAGS_LOAD_SUCCESS';
export const TAGS_LOAD_FAILURE = 'TAGS_LOAD_FAILURE';
export const TAGS_LOAD_BY_USER_ID_REQUEST = 'TAGS_LOAD_BY_USER_ID_REQUEST';
export const TAGS_LOAD_BY_USER_ID_SUCCESS = 'TAGS_LOAD_BY_USER_ID_SUCCESS';
export const TAGS_LOAD_BY_USER_ID_FAILURE = 'TAGS_LOAD_BY_USER_ID_FAILURE';

export interface TagState {
  id: number;
  name: string;
  count?: number;
}

export interface TagsState {
  byKey: {
    [key: string]: TagState;
  };
  loading?: boolean;
  currentIds?: number[];
  searchIds?: number[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
}

export interface TagsLoadApiResponseItem {
  type: 'tag';
  id: number;
  attributes: TagState;
}

export interface TagsLoadApiResponse {
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  data: TagsLoadApiResponseItem[];
}

interface TagsLoadRequestAction extends UnknownAction {
  type: typeof TAGS_LOAD_REQUEST;
  payload: Partial<TagsState>;
}

interface ReceiveTagsAction extends UnknownAction {
  type: typeof TAGS_LOAD_SUCCESS;
  payload: Partial<TagsState>;
}

interface TagsLoadFailureAction extends UnknownAction {
  type: typeof TAGS_LOAD_FAILURE;
  payload: Partial<TagsState>;
}

interface TagsLoadByUserIdRequestAction extends UnknownAction {
  type: typeof TAGS_LOAD_BY_USER_ID_REQUEST;
  payload: Partial<TagsState>;
}

interface TagsLoadByUserIdSuccesAction extends UnknownAction {
  type: typeof TAGS_LOAD_BY_USER_ID_SUCCESS;
  payload: Partial<TagsState>;
}

interface TagsLoadByUserIdFailureAction extends UnknownAction {
  type: typeof TAGS_LOAD_BY_USER_ID_FAILURE;
  payload: Partial<TagsState>;
}

export type TagsActions =
  | TagsLoadRequestAction
  | ReceiveTagsAction
  | TagsLoadFailureAction
  | TagsLoadByUserIdRequestAction
  | TagsLoadByUserIdSuccesAction
  | TagsLoadByUserIdFailureAction;
