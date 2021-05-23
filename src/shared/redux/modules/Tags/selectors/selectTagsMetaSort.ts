import { RootState } from 'Modules/rootType';

export const selectTagsMetaSort = (state: RootState): string => state.Tags?.meta?.sort;
