import { RootState } from 'Modules/rootType';
import { ListsState } from '../lists.types';

export const selectLists = (state: RootState): ListsState => state.Lists;
