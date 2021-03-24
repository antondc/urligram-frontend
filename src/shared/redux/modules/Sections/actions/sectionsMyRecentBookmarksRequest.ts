import { SECTIONS_MY_RECENT_BOOKMARKS_REQUEST, SectionsActions } from 'Modules/Sections/sections.types';

export const sectionsMyRecentBookmarksRequest = (): SectionsActions => ({
  type: SECTIONS_MY_RECENT_BOOKMARKS_REQUEST,
  data: {
    loading: true,
  },
});
