import { RootState } from 'Modules/rootType';
import { BookmarkListsModal } from '../ui.types';

export const selectBookmarkListsModal = (state: RootState): BookmarkListsModal => state.Ui?.bookmarkListsModal;
