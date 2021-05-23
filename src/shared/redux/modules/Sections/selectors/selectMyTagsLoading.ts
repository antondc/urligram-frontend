import { RootState } from 'Modules/rootType';

export const selectMyTagsLoading = (state: RootState): boolean => !!state.Sections?.MyTags?.loading;
