import { RootState } from '../../rootType';

export const selectUiResetPasswordModalMounted = (state: RootState): boolean => state.Ui['resetPasswordModal']?.mounted;
