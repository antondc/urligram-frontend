import { RootState } from 'Modules/rootType';

export const selectUserBookmarkIds = (State: Partial<RootState>, { userId }: { userId: string }): number[] =>
  State?.Users?.byKey?.[userId]?.bookmarksIds;
