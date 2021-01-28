import { ListsState } from '../Lists/lists.types';
import { UsersState } from '../Users/users.types';

export const LOAD_MOST_POPULAR_LISTS_STARTED = 'LOAD_MOST_POPULAR_LISTS_STARTED';
export const LOAD_MOST_POPULAR_LISTS_SUCCESS = 'LOAD_MOST_POPULAR_LISTS_SUCCESS';
export const SECTIONS_NEW_LISTS_REQUEST = 'SECTIONS_NEW_LISTS_REQUEST';
export const SECTIONS_NEW_LISTS_RECEIVE = 'SECTIONS_NEW_LISTS_RECEIVE';
export const SECTIONS_MOST_FOLLOWED_USERS_REQUEST = 'SECTIONS_MOST_FOLLOWED_USERS_REQUEST';
export const SECTIONS_MOST_FOLLOWED_USERS_RECEIVE = 'SECTIONS_MOST_FOLLOWED_USERS_RECEIVE';
export const SECTIONS_NEW_USERS_REQUEST = 'SECTIONS_NEW_USERS_REQUEST';
export const SECTIONS_NEW_USERS_RECEIVE = 'SECTIONS_NEW_USERS_RECEIVE';
export const SECTIONS_MY_LISTS_REQUEST = 'SECTIONS_MY_LISTS_REQUEST';
export const SECTIONS_MY_LISTS_RECEIVE = 'SECTIONS_MY_LISTS_RECEIVE';

export interface SectionsState {
  PopularLists?: Partial<ListsState>;
  NewLists?: Partial<ListsState>;
  MyLists?: Partial<ListsState>;
  MostFollowedUsers?: Partial<UsersState>;
  NewUsers?: Partial<UsersState>;
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

interface SectionMostFollowedUsersRequestAction {
  type: typeof SECTIONS_MOST_FOLLOWED_USERS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMostFollowedUsersReceiveAction {
  type: typeof SECTIONS_MOST_FOLLOWED_USERS_RECEIVE;
  data: SectionsState;
}

interface SectionNewUsersRequestAction {
  type: typeof SECTIONS_NEW_USERS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionNewUsersReceiveAction {
  type: typeof SECTIONS_NEW_USERS_RECEIVE;
  data: SectionsState;
}

interface SectionMyListsRequestAction {
  type: typeof SECTIONS_MY_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMyListsReceiveAction {
  type: typeof SECTIONS_MY_LISTS_RECEIVE;
  data: SectionsState;
}

export type SectionsActionsTypes =
  | RequestMostPopularListsAction
  | ReceiveMostPopularListsAction
  | SectionNewListsRequestAction
  | SectionNewListsReceiveAction
  | SectionMostFollowedUsersRequestAction
  | SectionMostFollowedUsersReceiveAction
  | SectionNewUsersRequestAction
  | SectionNewUsersReceiveAction
  | SectionMyListsRequestAction
  | SectionMyListsReceiveAction;
