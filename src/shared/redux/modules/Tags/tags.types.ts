export const TAGS_LOAD_REQUEST = 'TAGS_LOAD_REQUEST';
export const TAGS_LOAD_SUCCESS = 'TAGS_LOAD_SUCCESS';

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
}

export interface TagsLoadApiResponseItem {
  type: 'tag';
  id: number;
  attributes: TagState;
}

export interface TagsLoadApiResponse {
  data: TagsLoadApiResponseItem[];
}

interface TagsLoadRequestAction {
  type: typeof TAGS_LOAD_REQUEST;
  payload: Partial<TagsState>;
}

interface ReceiveTagsAction {
  type: typeof TAGS_LOAD_SUCCESS;
  payload: Partial<TagsState>;
}

export type TagsActions = TagsLoadRequestAction | ReceiveTagsAction;
