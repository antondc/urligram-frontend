import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiState, UiWelcomeModalState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiWelcomeModal = createSelector(
  selectUi,
  (ui: UiState): UiWelcomeModalState => get(ui, 'welcomeModal', {})
);
