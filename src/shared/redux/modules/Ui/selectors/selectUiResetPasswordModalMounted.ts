import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiResetPasswordModalState } from '../ui.types';
import { selectUiResetPasswordModal } from './selectUiResetPasswordModal';

export const selectUiResetPasswordModalMounted = createSelector(
  selectUiResetPasswordModal,
  (uiResetPasswordModal: UiResetPasswordModalState): boolean => get(uiResetPasswordModal, 'mounted', false)
);
