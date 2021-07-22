import { createSelector } from 'reselect';

import { ScreenType } from '../ui.types';
import { selectUiScreenType } from './selectUiScreenType';

export const selectUiScreenTypeIsDesktop = createSelector(
  selectUiScreenType,
  (uiScreenType: ScreenType): boolean => uiScreenType === 'desktop'
);
