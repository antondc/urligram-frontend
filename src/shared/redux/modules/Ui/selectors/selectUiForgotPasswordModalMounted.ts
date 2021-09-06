import { RootState } from '../../rootType';

export const selectUiForgotPasswordModalMounted = (state: RootState): boolean =>
  state.Ui['forgotPasswordModal']?.mounted;
