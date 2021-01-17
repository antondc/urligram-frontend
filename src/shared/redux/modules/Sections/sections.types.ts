import { ListsState, ListState } from '../Lists/lists.types';

export const LOAD_MOST_POPULAR_LISTS_STARTED = 'LOAD_MOST_POPULAR_LISTS_STARTED';
export const LOAD_MOST_POPULAR_LISTS_SUCCESS = 'LOAD_MOST_POPULAR_LISTS_SUCCESS';

export interface SectionsState {
  PopularLists: ListsState;
}

interface RequestMostPopularListsAction {
  type: typeof LOAD_MOST_POPULAR_LISTS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveMostPopularListsAction {
  type: typeof LOAD_MOST_POPULAR_LISTS_SUCCESS;
  data: SectionsState;
}

export interface ReceiveMostPopularListsResponse {
  data: {
    type: 'lists';
    id: number;
    attributes: ListState;
  }[];
}

export interface ReceiveMostPopularListsResponse {
  data: {
    type: 'lists';
    id: number;
    attributes: ListState;
  }[];
}

export type SectionsActionsTypes = RequestMostPopularListsAction | ReceiveMostPopularListsAction;
