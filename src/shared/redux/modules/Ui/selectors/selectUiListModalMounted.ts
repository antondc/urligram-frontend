import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiBaseModal } from '../ui.types';
import { selectUiListModal } from './selectUiListModal';

export const selectUiListModalMounted = createSelector(selectUiListModal, (uiListModal: UiBaseModal): boolean =>
  get(uiListModal, 'mounted', false)
);
