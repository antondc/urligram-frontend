import { SECTIONS_FOLLOWING_LISTS_SUCCESS, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingListsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWING_LISTS_SUCCESS,
  payload,
});
