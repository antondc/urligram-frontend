import { SECTIONS_MOST_USED_TAGS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostUsedTagsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_USED_TAGS_RECEIVE,
  data,
});
