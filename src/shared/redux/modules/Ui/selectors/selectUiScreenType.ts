import { RootState } from 'Modules/rootType';
import { ScreenType } from '../ui.types';

export const selectUiScreenType = (state: RootState): ScreenType => state.Ui?.screenType;
