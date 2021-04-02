import { RootState } from 'Modules/rootType';
import { LinkBookmark } from '../links.types';

interface Props {
  linkId: number;
  userId: string;
}
export const selectLinkBookmarkIdByUserId = (
  state: RootState,
  { linkId, userId }: Props
): LinkBookmark | Record<string, never> =>
  state.Links?.byKey[linkId]?.bookmarks?.find((item) => item.userId === userId) || {};
