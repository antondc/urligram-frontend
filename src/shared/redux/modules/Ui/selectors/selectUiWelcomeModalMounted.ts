import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiWelcomeModalState } from './../ui.types';
import { selectUiWelcomeModal } from './selectUiWelcomeModal';

export const selectUiWelcomeModalMounted = createSelector(
  selectUiWelcomeModal,
  (uiWelcomeModal: UiWelcomeModalState): boolean => get(uiWelcomeModal, 'mounted', false)
);
