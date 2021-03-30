import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarkByLinkIdAndUserId = (
  state: RootState,
  { linkId, userId }: { linkId: number; userId: string }
): BookmarkState | Record<string, never> =>
  Object.values(state.Bookmarks.byKey).find((item) => item?.linkId === linkId && item?.userId === userId) || {};
