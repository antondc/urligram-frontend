export interface ListState {
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

export interface ListsState {
  byKey: {
    [key: string]: ListState;
  };
  loading?: boolean;
}

export interface ReceiveListItem {
  type: 'list';
  id: number;
  attributes: ListState;
}

export interface ReceiveListsResponse {
  data: ReceiveListItem[];
}
