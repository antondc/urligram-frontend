import {
  SECTIONS_MOST_FOLLOWED_TAGS_RECEIVE,
  SectionsActionsTypes,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsMostFollowedTagsReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_MOST_FOLLOWED_TAGS_RECEIVE,
  data,
});
