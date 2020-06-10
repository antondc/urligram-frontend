import { LOAD_LINKS_STARTED, LinksActionsTypes } from 'Modules/Links/links.types';

export const requestLinks = (): LinksActionsTypes => {
  return {
    type: LOAD_LINKS_STARTED,
    data: {
      loading: true,
    },
  };
};
