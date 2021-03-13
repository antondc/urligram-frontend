import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiForgotPasswordModalState } from '../ui.types';
import { selectUiForgotPasswordModal } from './selectUiForgotPasswordModal';

export const selectUiForgotPasswordModalMounted = createSelector(
  selectUiForgotPasswordModal,
  (uiForgotPasswordModal: UiForgotPasswordModalState): boolean => get(uiForgotPasswordModal, 'mounted', false)
);
