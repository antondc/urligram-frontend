import { RootState } from 'Modules/rootType';
import { BookmarkListsModal } from '../ui.types';

export const selectBookmarkListsModalsMounted = (state: RootState): BookmarkListsModal[] =>
  state.Ui?.bookmarkListsModals?.filter((item) => !!item.mounted);
