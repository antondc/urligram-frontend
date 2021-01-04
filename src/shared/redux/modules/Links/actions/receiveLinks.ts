import { LinksActionsTypes,LinksState, LOAD_LINKS_SUCCESS } from 'Modules/Links/links.types';

export const receiveLinks = (data: LinksState): LinksActionsTypes => ({
  type: LOAD_LINKS_SUCCESS,
  data: {
    ...data,
  },
});
