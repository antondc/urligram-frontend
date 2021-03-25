import { SECTIONS_MY_TAGS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyTagsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_TAGS_SUCCESS,
  payload,
});
