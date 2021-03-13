import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiSignUpModalState, UiState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiSignUpModal = createSelector(
  selectUi,
  (ui: UiState): UiSignUpModalState => get(ui, 'signUpModal', {})
);
