export const selectBookmarkVoteLoading = (state, props): boolean =>
  !!state.Bookmarks?.byKey[props.bookmarkId]?.statistics?.loading;
