import { LOAD_LINKS_SUCCESS, LinksState, LinksActionsTypes } from 'Modules/Links/links.types';

export const receiveLinks = (data: LinksState): LinksActionsTypes => {
  return {
    type: LOAD_LINKS_SUCCESS,
    data: {
      ...data,
    },
  };
};
