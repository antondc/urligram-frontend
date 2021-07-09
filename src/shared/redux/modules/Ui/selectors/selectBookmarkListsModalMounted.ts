import { RootState } from 'Modules/rootType';

export const selectBookmarkListsModalMounted = (state: RootState): boolean => state.Ui?.bookmarkListsModal.mounted;
