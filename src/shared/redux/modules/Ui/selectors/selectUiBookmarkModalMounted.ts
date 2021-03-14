import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from '../ui.types';
import { selectUiBookmarkModal } from './selectUiBookmarkModal';

export const selectUiBookmarkModalMounted = createSelector(
  selectUiBookmarkModal,
  (uiBookmarkModal: UiBaseModal): boolean => get(uiBookmarkModal, 'mounted', false)
);
