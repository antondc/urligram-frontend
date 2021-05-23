import { SECTIONS_MY_RECENT_BOOKMARKS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyRecentBookmarksSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_RECENT_BOOKMARKS_SUCCESS,
  payload,
});
