import { RootState } from 'Modules/rootType';
import { BookmarkListsModal } from '../ui.types';

export const selectBookmarkListsModal = (
  state: RootState,
  { bookmarkId }: { bookmarkId: number }
): BookmarkListsModal => state.Ui?.bookmarkListsModals?.find((item) => item.bookmarkId === bookmarkId);
