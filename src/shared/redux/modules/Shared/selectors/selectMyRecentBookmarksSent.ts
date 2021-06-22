import { RootState } from 'Modules/rootType';
import { SharedItemState } from '../shared.types';

export const selectMyRecentBookmarksSent = (state: RootState): SharedItemState[] =>
  state.Shared?.bookmarksSent.slice(0, 4);
