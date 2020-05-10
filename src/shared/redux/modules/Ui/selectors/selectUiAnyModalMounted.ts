import { createSelector } from 'reselect';
import { UiState } from '../ui.types';
import { selectUi } from './selectUi';

export const selectUiAnyModalMounted = createSelector(selectUi, (ui: UiState): boolean =>
  Object.values(ui).some((item) => item.mounted)
);
