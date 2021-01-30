export const LOAD_TAGS_STARTED = 'LOAD_TAGS_STARTED';
export const LOAD_TAGS_SUCCESS = 'LOAD_TAGS_SUCCESS';

export interface TagState {
  id: number;
  name: string;
}

export interface TagsState {
  byKey: {
    [key: string]: TagState;
  };
  loading?: boolean;
  currentIds?: number[];
}

export interface ReceiveTagItem {
  type: 'tag';
  id: number;
  attributes: TagState;
}

export interface ReceiveTagsResponse {
  data: ReceiveTagItem[];
}

interface RequestTagsAction {
  type: typeof LOAD_TAGS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveTagsAction {
  type: typeof LOAD_TAGS_SUCCESS;
  data: TagsState;
}

export type TagsActionsTypes = RequestTagsAction | ReceiveTagsAction;
