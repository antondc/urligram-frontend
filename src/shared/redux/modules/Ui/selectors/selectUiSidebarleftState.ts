import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiSidebarleftState = createSelector(selectUi, (ui: UiState): boolean =>
  get(ui, 'sidebarLeftState.closed', false)
);
