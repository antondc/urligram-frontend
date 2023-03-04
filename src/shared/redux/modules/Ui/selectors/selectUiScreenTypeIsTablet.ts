import { createSelector } from 'reselect';

import { ScreenType } from '../ui.types';
import { selectUiScreenType } from './selectUiScreenType';

export const selectUiScreenTypeIsTablet = createSelector(
  selectUiScreenType,
  (uiScreenType: ScreenType): boolean => uiScreenType === ScreenType.Tablet
);
