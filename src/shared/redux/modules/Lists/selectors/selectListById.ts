import { RootState } from 'Modules/rootType';
import { ListState } from '../lists.types';

export const selectListsById = (state: RootState, { id }: { id: number }): ListState => state.Lists?.byKey[id];
