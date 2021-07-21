import { RootState } from 'Modules/rootType';
import { ListState } from '../../Lists/lists.types';
import { TagState } from '../../Tags/tags.types';
import { BookmarkState } from '../bookmarks.types';

type SelectBookmarksByLInkIdAndListId = (
  state: RootState,
  { linkId, listId }: { linkId: number; listId: number }
) => TagState[];

export const selectBookmarksByLinkIdAndListId: SelectBookmarksByLInkIdAndListId = (state, { linkId, listId }) => {
  if (!linkId || !listId) return [];

  // Select lists that share tha same provided linkId
  const bookmarksByLinkId: BookmarkState[] = Object.values(state.Bookmarks.byKey).filter(
    (item) => item?.linkId === linkId
  );
  const list: ListState = state.Lists.byKey[listId];
  const listUsers: string[] = list?.members?.map((item) => item.id);
  // Select bookmarks whose users are present in the list, or are owners of it
  const bookmarksWithUserInList = bookmarksByLinkId?.filter(
    (item) => item.userId === list.userId || listUsers?.includes(item.userId)
  );
  const tagsFromBookmarksInLists = bookmarksWithUserInList.reduce((acc, curr) => {
    acc.concat(curr.tags);

    return acc;
  }, []);

  return tagsFromBookmarksInLists;
};
