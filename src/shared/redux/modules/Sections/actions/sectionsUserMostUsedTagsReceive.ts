import { SECTIONS_USER_MOST_USED_TAGS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserMostUsedTagsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_USER_MOST_USED_TAGS_RECEIVE,
  data: {
    ...data,
  },
});
