import { createSelector } from 'reselect';
import get from 'lodash/get';

import { NotificationState, UiState } from './../ui.types';
import { selectUi } from './selectUi';

export const selectUiNotifications = createSelector(selectUi, (ui: UiState): NotificationState[] =>
  get(ui, 'notifications', [])
);
