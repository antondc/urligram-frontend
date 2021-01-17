import { RootState } from 'Modules/rootType';

export const selectLinksVoteLoading = (state: RootState): boolean =>
  !!Object.values(state.Links?.byKey).find((item) => !!item?.statistics?.loading);
