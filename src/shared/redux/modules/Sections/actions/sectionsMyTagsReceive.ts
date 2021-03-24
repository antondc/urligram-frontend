import { SECTIONS_MY_TAGS_RECEIVE, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyTagsReceive = (data: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_TAGS_RECEIVE,
  data,
});
