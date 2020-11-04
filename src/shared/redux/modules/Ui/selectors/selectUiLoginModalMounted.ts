import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiLoginModalState } from './../ui.types';
import { selectUiLoginModal } from './selectUiLoginModal';

export const selectUiLoginModalMounted = createSelector(
  selectUiLoginModal,
  (uiLoginModal: UiLoginModalState): boolean => get(uiLoginModal, 'mounted', false)
);
