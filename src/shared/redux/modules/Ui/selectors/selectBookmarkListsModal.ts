import { createSelector } from 'reselect';

import { BookmarkListsModal, UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectBookmarkListsModal = createSelector(
  selectUi,
  (Ui: UiState): BookmarkListsModal => Ui?.bookmarkActionsIcons
);
