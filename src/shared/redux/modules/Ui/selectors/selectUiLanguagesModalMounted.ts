import { RootState } from '../../rootType';

export const selectUiLanguagesModalMounted = (state: RootState): boolean => state.Ui['languagesModal']?.mounted;
