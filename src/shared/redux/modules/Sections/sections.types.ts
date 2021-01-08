export const LOAD_MOST_POPULAR_LISTS_STARTED = 'LOAD_MOST_POPULAR_LISTS_STARTED';
export const LOAD_MOST_POPULAR_LISTS_SUCCESS = 'LOAD_MOST_POPULAR_LISTS_SUCCESS';

export interface UserState {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  members: number;
  listMembers: [
    {
      id: string;
      name: string;
      userRole: string;
    },
    {
      id: string;
      name: string;
      userRole: string;
    }
  ];
}
export interface PopularListsState {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  members: {
    id: string;
    name: string;
    userRole: string;
  }[];
}

export interface SectionsState {
  PopularLists: {
    byKey: {
      [key: string]: PopularListsState;
    };
    loading?: boolean;
  };
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
    attributes: PopularListsState;
  }[];
}

export type SectionsActionsTypes = RequestMostPopularListsAction | ReceiveMostPopularListsAction;
