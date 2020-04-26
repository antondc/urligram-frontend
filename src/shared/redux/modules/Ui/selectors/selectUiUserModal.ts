import { createSelector } from 'reselect';
import get from 'lodash/get';
import { UiState, UiUserModalState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiUserModal = createSelector(selectUi, (ui: UiState): UiUserModalState => get(ui, 'userModal', {}));
