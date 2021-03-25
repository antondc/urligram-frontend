import { SECTIONS_FOLLOWING_LISTS_REQUEST, SectionsActions, SectionsState } from 'Modules/Sections/sections.types';

export const sectionsFollowingListsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_FOLLOWING_LISTS_REQUEST,
  payload,
});
