import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiMessageModalState } from './../ui.types';
import { selectUiMessageModal } from './selectUiMessageModal';

export const selectUiMessageModalMounted = createSelector(
  selectUiMessageModal,
  (uiMessageModal: UiMessageModalState): boolean => get(uiMessageModal, 'mounted', false)
);
