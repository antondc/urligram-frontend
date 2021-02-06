import { SECTIONS_MY_RECENT_BOOKMARKS_REQUEST, SectionsActionsTypes } from 'Modules/Sections/sections.types';

export const sectionsMyRecentBookmarksRequest = (): SectionsActionsTypes => ({
  type: SECTIONS_MY_RECENT_BOOKMARKS_REQUEST,
  data: {
    loading: true,
  },
});
