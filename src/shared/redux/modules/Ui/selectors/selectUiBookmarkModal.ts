import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal, UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiBookmarkModal = createSelector(
  selectUi,
  (ui: UiState): UiBaseModal => get(ui, 'bookmarkModal', {})
);
