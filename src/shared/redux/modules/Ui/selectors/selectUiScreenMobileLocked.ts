import { RootState } from '../../rootType';

export const selectUiScreenMobileLocked = (state: RootState): boolean => state.Ui?.screenMobileLocked;
