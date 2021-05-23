import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from './../ui.types';
import { selectUiSignUpModal } from './selectUiSignUpModal';

export const selectUiSignUpModalMounted = createSelector(selectUiSignUpModal, (uiSignUpModal: UiBaseModal): boolean =>
  get(uiSignUpModal, 'mounted', false)
);
