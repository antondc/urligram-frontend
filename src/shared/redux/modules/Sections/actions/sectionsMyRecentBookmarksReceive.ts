import { SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyRecentBookmarksReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE,
  data: {
    ...data,
  },
});
