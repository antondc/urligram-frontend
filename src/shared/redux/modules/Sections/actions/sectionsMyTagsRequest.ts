import { SECTIONS_MY_TAGS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsMyTagsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MY_TAGS_REQUEST,
  payload,
});
