import { RootState } from 'Modules/rootType';
import { BookmarkListsModal } from '../ui.types';

export const selectBookmarkSendModal = (
  state: RootState,
  { bookmarkId }: { bookmarkId: number }
): BookmarkListsModal => state.Ui?.bookmarkSendModals?.find((item) => item.bookmarkId === bookmarkId);
