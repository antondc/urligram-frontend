import { RootState } from '../../rootType';

export const selectUiWelcomeModalMounted = (state: RootState): boolean => state.Ui['welcomeModal']?.mounted;
