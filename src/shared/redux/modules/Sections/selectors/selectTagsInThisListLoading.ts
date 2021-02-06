import { RootState } from 'Modules/rootType';

export const selectTagsInThisListLoading = (state: RootState): boolean => !!state.Sections?.TagsInThisList?.loading;
