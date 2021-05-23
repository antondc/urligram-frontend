import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from '../ui.types';
import { selectUiBookmarkUpdateModal } from './selectUiBookmarkUpdateModal';

export const selectUiBookmarkUpdateModalMounted = createSelector(
  selectUiBookmarkUpdateModal,
  (uiBookmarkModal: UiBaseModal): boolean => get(uiBookmarkModal, 'mounted', false)
);
