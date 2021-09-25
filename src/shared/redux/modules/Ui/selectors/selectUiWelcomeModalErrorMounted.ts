import { RootState } from '../../rootType';

export const selectUiWelcomeModalErrorMounted = (state: RootState): boolean => state.Ui['welcomeModalError']?.mounted;
