import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from './../ui.types';
import { selectUiWelcomeModal } from './selectUiWelcomeModal';

export const selectUiWelcomeModalMounted = createSelector(
  selectUiWelcomeModal,
  (uiWelcomeModal: UiBaseModal): boolean => get(uiWelcomeModal, 'mounted', false)
);
