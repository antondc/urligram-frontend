import { createSelector } from 'reselect';

import { UiBaseModal, UiState } from '../ui.types';
import { selectUi } from './selectUi';

type ExtendedUiBaseModal = {
  bookmarkId: number;
} & UiBaseModal;

export const selectBookmarkActionsIcons = createSelector(
  selectUi,
  (Ui: UiState): ExtendedUiBaseModal => Ui?.bookmarkActionsIcons
);
