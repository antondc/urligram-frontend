import { createSelector } from 'reselect';

import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiScreenLocked = createSelector(selectUi, (ui: UiState): boolean => ui.screenLocked);
