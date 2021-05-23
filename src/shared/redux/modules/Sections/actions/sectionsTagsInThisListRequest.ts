import { SECTIONS_TAGS_IN_THIS_LIST_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsTagsInThisListRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_TAGS_IN_THIS_LIST_REQUEST,
  payload,
});
