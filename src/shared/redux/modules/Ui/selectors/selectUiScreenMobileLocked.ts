import { createSelector } from 'reselect';

import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiScreenMobileLocked = createSelector(selectUi, (ui: UiState): boolean => ui.screenMobileLocked);
