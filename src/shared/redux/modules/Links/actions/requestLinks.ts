import { LinksActionsTypes, LOAD_LINKS_STARTED } from 'Modules/Links/links.types';

export const requestLinks = (): LinksActionsTypes => ({
  type: LOAD_LINKS_STARTED,
  data: {
    loading: true,
  },
});
