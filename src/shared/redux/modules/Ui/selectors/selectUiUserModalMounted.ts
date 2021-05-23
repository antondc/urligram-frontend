import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from './../ui.types';
import { selectUiUserModal } from './selectUiUserModal';

export const selectUiUserModalMounted = createSelector(selectUiUserModal, (uiUserModal: UiBaseModal): boolean =>
  get(uiUserModal, 'mounted', false)
);
