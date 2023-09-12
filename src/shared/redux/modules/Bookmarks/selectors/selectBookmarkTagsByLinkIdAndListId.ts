import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { ListsState, ListState } from '../../Lists/lists.types';
import { TagState } from '../../Tags/tags.types';
import { BookmarksState, BookmarkState } from '../bookmarks.types';

const selectBookmarksState = (state: RootState): BookmarksState => state.Bookmarks;
const selectLists = (state: RootState): ListsState => state.Lists;
const selectlinkId = (_, { linkId }): number => linkId;
const selectlistId = (_, { listId }): number => listId;

export const selectBookmarkTagsByLinkIdAndListId = createSelector(
  [selectBookmarksState, selectLists, selectlinkId, selectlistId],
  (Bookmarks, Lists, linkId, listId): TagState[] => {
    if (!linkId || !listId) return [];

    // Select lists that share tha same provided linkId
    const bookmarksByLinkId: BookmarkState[] = Object.values(Bookmarks.byKey).filter((item) => item?.linkId === linkId);

    const list: ListState = Lists.byKey[listId];
    const listUsers: string[] = list?.members?.map((item) => item.id);

    // Select bookmarks whose users are present in the list, or are owners of it
    const bookmarksWithUserInList = bookmarksByLinkId?.filter(
      (item) => item.userId === list?.userId || listUsers?.includes(item.userId)
    );

    const tagsFromBookmarksInLists = bookmarksWithUserInList.reduce((acc, curr) => acc.concat(curr?.tags || []), []);

    // Remove duplicates
    const tagsIds = tagsFromBookmarksInLists.map((item) => item.id);
    const arrayIdsNoDuplicates = Array.from(new Set(tagsIds));
    const tagsFromBookmarksInListsNoDuplicates = arrayIdsNoDuplicates.map((item) =>
      tagsFromBookmarksInLists.find((item2) => item2.id === item)
    );

    return tagsFromBookmarksInListsNoDuplicates;
  }
);
