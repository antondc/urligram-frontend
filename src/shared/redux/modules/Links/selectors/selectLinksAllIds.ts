import { RootState } from 'Modules/rootType';

export const selectLinksAllIds = (state: RootState): number[] => state.Links?.allIds;
