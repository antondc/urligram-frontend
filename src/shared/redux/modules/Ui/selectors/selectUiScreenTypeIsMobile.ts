import { createSelector } from 'reselect';

import { ScreenType } from '../ui.types';
import { selectUiScreenType } from './selectUiScreenType';

export const selectUiScreenTypeIsMobile = createSelector(
  selectUiScreenType,
  (uiScreenType: ScreenType): boolean => uiScreenType === 'mobile'
);
