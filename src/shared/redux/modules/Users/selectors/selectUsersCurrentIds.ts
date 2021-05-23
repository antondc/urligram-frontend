import { RootState } from 'Modules/rootType';

export const selectUsersCurrentIds = (state: RootState): string[] => state.Users?.currentIds;
