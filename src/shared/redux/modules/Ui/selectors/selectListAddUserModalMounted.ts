import { RootState } from 'Modules/rootType';

export const selectListAddUserModalMounted = (state: RootState): boolean => state.Ui?.listAddUserModal?.mounted;
