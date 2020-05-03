import { createSelector } from 'reselect';
import get from 'lodash/get';
import { UiMessageModalState } from './../ui.types';
import { selectUiMessageModal } from './selectUiMessageModal';

export const selectuiMessageModalMounted = createSelector(selectUiMessageModal, (uiMessageModal: UiMessageModalState): boolean =>
  get(uiMessageModal, 'mounted', false)
);
