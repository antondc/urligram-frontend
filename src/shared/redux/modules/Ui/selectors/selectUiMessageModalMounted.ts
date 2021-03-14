import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from './../ui.types';
import { selectUiMessageModal } from './selectUiMessageModal';

export const selectUiMessageModalMounted = createSelector(
  selectUiMessageModal,
  (uiMessageModal: UiBaseModal): boolean => get(uiMessageModal, 'mounted', false)
);
