import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from '../ui.types';
import { selectUiResetPasswordModal } from './selectUiResetPasswordModal';

export const selectUiResetPasswordModalMounted = createSelector(
  selectUiResetPasswordModal,
  (uiResetPasswordModal: UiBaseModal): boolean => get(uiResetPasswordModal, 'mounted', false)
);
