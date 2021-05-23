import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from '../ui.types';
import { selectUiForgotPasswordModal } from './selectUiForgotPasswordModal';

export const selectUiForgotPasswordModalMounted = createSelector(
  selectUiForgotPasswordModal,
  (uiForgotPasswordModal: UiBaseModal): boolean => get(uiForgotPasswordModal, 'mounted', false)
);
