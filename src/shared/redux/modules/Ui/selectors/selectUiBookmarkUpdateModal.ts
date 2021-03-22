import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiBookmarkUpdateModal = createSelector(selectUi, (ui: UiState): UiState['bookmarkUpdateModal'] =>
  get(ui, 'bookmarkUpdateModal', {})
);
