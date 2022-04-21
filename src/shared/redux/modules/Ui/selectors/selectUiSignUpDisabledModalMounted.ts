import { createSelector } from 'reselect';

import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiSignUpDisabledModalMounted = createSelector(
  selectUi,
  (ui: UiState): boolean => ui?.signUpDisabledModal?.mounted || false
);
