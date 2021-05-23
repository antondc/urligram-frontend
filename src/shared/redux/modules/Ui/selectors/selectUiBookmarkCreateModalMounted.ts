import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from '../ui.types';
import { selectUiBookmarkCreateModal } from './selectUiBookmarkCreateModal';

export const selectUiBookmarkCreateModalMounted = createSelector(
  selectUiBookmarkCreateModal,
  (uiBookmarkModal: UiBaseModal): boolean => get(uiBookmarkModal, 'mounted', false)
);
