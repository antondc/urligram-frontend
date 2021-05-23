import { RootState } from 'Modules/rootType';

export const selectListLoading = (state: RootState, { id }: { id: number }): boolean => state.Lists?.byKey[id]?.loading;
