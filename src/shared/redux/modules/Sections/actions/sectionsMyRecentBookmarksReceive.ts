import {
  SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE,
  SectionsActionsTypes,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsMyRecentBookmarksReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE,
  data: {
    ...data,
  },
});
