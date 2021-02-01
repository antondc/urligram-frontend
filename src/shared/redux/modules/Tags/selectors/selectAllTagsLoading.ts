import { RootState } from 'Modules/rootType';

export const selectTagsLoading = (state: RootState): boolean => !!state.Tags?.loading;
