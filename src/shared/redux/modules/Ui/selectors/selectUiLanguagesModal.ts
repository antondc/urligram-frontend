import { createSelector } from 'reselect';
import get from 'lodash/get';
import { UiState, UiLanguagesModalState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiLanguagesModal = createSelector(selectUi, (ui: UiState): UiLanguagesModalState => get(ui, 'languagesModal', {}));
