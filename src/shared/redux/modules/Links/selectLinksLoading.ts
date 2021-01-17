import { RootState } from 'Modules/rootType';

export const selectLinksLoading = (state: RootState): boolean => !!state.Links.loading;
