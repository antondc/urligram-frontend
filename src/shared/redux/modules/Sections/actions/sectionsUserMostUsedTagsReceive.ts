import { SECTIONS_USER_MOST_USED_TAGS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsUserMostUsedTagsReceive = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_USER_MOST_USED_TAGS_SUCCESS,
  payload,
});
