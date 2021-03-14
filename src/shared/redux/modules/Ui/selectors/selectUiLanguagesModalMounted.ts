import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from './../ui.types';
import { selectUiLanguagesModal } from './selectUiLanguagesModal';

export const selectUiLanguagesModalMounted = createSelector(
  selectUiLanguagesModal,
  (uiLanguagesModal: UiBaseModal): boolean => get(uiLanguagesModal, 'mounted', false)
);
