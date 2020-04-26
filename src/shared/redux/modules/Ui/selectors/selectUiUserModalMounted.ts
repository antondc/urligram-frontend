import { createSelector } from 'reselect';
import get from 'lodash/get';
import { UiUserModalState } from './../ui.types';
import { selectUiUserModal } from './selectUiUserModal';

export const selectuiUserModalMounted = createSelector(selectUiUserModal, (uiUserModal: UiUserModalState): boolean =>
  get(uiUserModal, 'mounted', false)
);
