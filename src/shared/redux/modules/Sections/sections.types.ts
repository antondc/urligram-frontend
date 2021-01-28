import { ListsState, ListState } from '../Lists/lists.types';

export const LOAD_MOST_POPULAR_LISTS_STARTED = 'LOAD_MOST_POPULAR_LISTS_STARTED';
export const LOAD_MOST_POPULAR_LISTS_SUCCESS = 'LOAD_MOST_POPULAR_LISTS_SUCCESS';
export const SECTIONS_NEW_LISTS_REQUEST = 'SECTIONS_NEW_LISTS_REQUEST';
export const SECTIONS_NEW_LISTS_RECEIVE = 'SECTIONS_NEW_LISTS_RECEIVE';

export interface SectionsState {
  PopularLists?: ListsState;
  NewLists?: ListsState;
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

export interface ReceiveListsResponse {
  data: {
    type: 'lists';
    id: number;
    attributes: ListState;
  }[];
}

interface SectionNewListsRequestAction {
  type: typeof SECTIONS_NEW_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionNewListsReceiveAction {
  type: typeof SECTIONS_NEW_LISTS_RECEIVE;
  data: SectionsState;
}

export type SectionsActionsTypes =
  | RequestMostPopularListsAction
  | ReceiveMostPopularListsAction
  | SectionNewListsRequestAction
  | SectionNewListsReceiveAction;
