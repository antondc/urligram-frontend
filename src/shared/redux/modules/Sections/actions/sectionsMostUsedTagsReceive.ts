import { SECTIONS_MOST_USED_TAGS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostUsedTagsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_MOST_USED_TAGS_RECEIVE,
  data,
});
