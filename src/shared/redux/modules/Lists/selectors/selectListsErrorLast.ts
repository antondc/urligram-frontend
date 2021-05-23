import { RootState } from 'Modules/rootType';
import { ListsError } from '../lists.types';

export const selectListsErrorLast = (state: RootState): ListsError =>
  state.Lists.errors?.length ? state.Lists.errors[state.Lists.errors?.length - 1] : null;
