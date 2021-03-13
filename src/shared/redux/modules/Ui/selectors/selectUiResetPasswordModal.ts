import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiResetPasswordModalState, UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiResetPasswordModal = createSelector(
  selectUi,
  (ui: UiState): UiResetPasswordModalState => get(ui, 'resetPasswordModal', {})
);
