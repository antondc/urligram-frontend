import { SECTIONS_MOST_USED_TAGS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMostUsedTagsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_USED_TAGS_SUCCESS,
  payload,
});
