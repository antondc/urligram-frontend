import { SECTIONS_FOLLOWING_LISTS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingListsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWING_LISTS_RECEIVE,
  data: {
    ...data,
  },
});
