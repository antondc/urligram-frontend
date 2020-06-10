export const LOAD_LINKS_STARTED = 'LOAD_LINKS_STARTED';
export const LOAD_LINKS_SUCCESS = 'LOAD_LINKS_SUCCESS';

export interface LinkState {
  id: number;
  title: string;
  url: string;
  img: string;
  tags: { id: number; name: string }[];
  vote?: boolean;
}

export interface LinksState {
  byKey: {
    [key: string]: LinkState;
  };
}

interface RequestLinksAction {
  type: typeof LOAD_LINKS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveLinksAction {
  type: typeof LOAD_LINKS_SUCCESS;
  data: LinksState;
}

export interface ReceiveLinksResponse {
  status: string;
  data: {
    Links: LinksState;
  };
}

export type LinksActionsTypes = RequestLinksAction | ReceiveLinksAction;
