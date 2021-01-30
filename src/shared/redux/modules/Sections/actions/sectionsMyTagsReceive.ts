import { SECTIONS_MY_TAGS_RECEIVE, SectionsActionsTypes, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyTagsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_MY_TAGS_RECEIVE,
  data,
});
