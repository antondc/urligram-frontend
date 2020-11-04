import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiMessageModalState,UiState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiMessageModal = createSelector(selectUi, (ui: UiState): UiMessageModalState => get(ui, 'messageModal', {}));
