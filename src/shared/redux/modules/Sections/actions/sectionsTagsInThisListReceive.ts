import { SECTIONS_TAGS_IN_THIS_LIST_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsTagsInThisListReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_TAGS_IN_THIS_LIST_RECEIVE,
  data: {
    ...data,
  },
});
