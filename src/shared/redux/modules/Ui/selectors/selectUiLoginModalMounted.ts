import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from './../ui.types';
import { selectUiLoginModal } from './selectUiLoginModal';

export const selectUiLoginModalMounted = createSelector(selectUiLoginModal, (uiLoginModal: UiBaseModal): boolean =>
  get(uiLoginModal, 'mounted', false)
);
