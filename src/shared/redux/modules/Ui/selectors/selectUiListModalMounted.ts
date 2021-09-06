import { RootState } from '../../rootType';

export const selectUiListModalMounted = (state: RootState): boolean => state.Ui['listModal']?.mounted;
