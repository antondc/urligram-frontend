import { createSelector } from 'reselect';

import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiSidebarListsOpen = createSelector(selectUi, (ui: UiState): boolean => ui.sidebarListsState?.open);
