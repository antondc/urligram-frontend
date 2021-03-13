import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiSignUpModalState } from './../ui.types';
import { selectUiSignUpModal } from './selectUiSignUpModal';

export const selectUiSignUpModalMounted = createSelector(
  selectUiSignUpModal,
  (uiSignUpModal: UiSignUpModalState): boolean => get(uiSignUpModal, 'mounted', false)
);
