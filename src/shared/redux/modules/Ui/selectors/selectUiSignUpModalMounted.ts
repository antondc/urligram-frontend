import { RootState } from '../../rootType';

export const selectUiSignUpModalMounted = (state: RootState): boolean => state.Ui['signUpModal']?.mounted;
