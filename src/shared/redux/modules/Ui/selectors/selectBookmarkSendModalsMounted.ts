import { RootState } from 'Modules/rootType';
import { BookmarkListsModal } from '../ui.types';

export const selectBookmarkSendModalsMounted = (state: RootState): BookmarkListsModal[] =>
  state.Ui?.bookmarkSendModals?.filter((item) => !!item.mounted);
