import { RootState } from 'Modules/rootType';
import { BookmarkState } from '../bookmarks.types';

export const selectBookmarksWithSimilarLinkId = (state: RootState, { linkId }: { linkId: number }): BookmarkState[] =>
  Object.values(state.Bookmarks?.byKey).filter((item) => item?.linkId === linkId);
