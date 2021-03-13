import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiForgotPasswordModalState, UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiForgotPasswordModal = createSelector(
  selectUi,
  (ui: UiState): UiForgotPasswordModalState => get(ui, 'forgotPasswordModal', {})
);
