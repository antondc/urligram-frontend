import { RootState } from '../../rootType';

export const selectUiLoginModalMounted = (state: RootState): boolean => state.Ui['loginModal']?.mounted;
