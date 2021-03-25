import { SECTIONS_MY_RECENT_BOOKMARKS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyRecentBookmarksRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_RECENT_BOOKMARKS_REQUEST,
  payload,
});
