import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiListModal = createSelector(selectUi, (ui: UiState): UiState['listModal'] =>
  get(ui, 'listModal', {})
);
