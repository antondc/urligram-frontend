import { createSelector } from 'reselect';
import get from 'lodash/get';
import { UiState, UiLoginModalState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiLoginModal = createSelector(
  selectUi,
  (ui: UiState): UiLoginModalState => get(ui, 'loginModal', {})
);
