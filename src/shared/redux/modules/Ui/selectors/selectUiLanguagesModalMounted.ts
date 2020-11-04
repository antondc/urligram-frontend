import { createSelector } from 'reselect';
import get from 'lodash/get';

import { UiLanguagesModalState } from './../ui.types';
import { selectUiLanguagesModal } from './selectUiLanguagesModal';

export const selectUiLanguagesModalMounted = createSelector(selectUiLanguagesModal, (uiLanguagesModal: UiLanguagesModalState): boolean =>
  get(uiLanguagesModal, 'mounted', false)
);
