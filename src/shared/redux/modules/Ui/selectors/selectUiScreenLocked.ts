import { RootState } from '../../rootType';

export const selectUiScreenLocked = (state: RootState): boolean => state.Ui?.screenLocked;
