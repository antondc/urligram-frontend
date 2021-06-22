import { RootState } from 'Modules/rootType';
import { SharedItemState } from '../shared.types';

export const selectMyRecentBookmarksReceived = (state: RootState): SharedItemState[] =>
  state.Shared?.bookmarksReceived.slice(0, 4);
