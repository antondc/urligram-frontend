import { SECTIONS_USER_MOST_USED_TAGS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserMostUsedTagsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_USER_MOST_USED_TAGS_RECEIVE,
  data: {
    ...data,
  },
});
