import { SECTIONS_TAGS_IN_THIS_LIST_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsTagsInThisListReceive = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_TAGS_IN_THIS_LIST_SUCCESS,
  payload,
});
