import {
  SECTIONS_TAGS_IN_THIS_LIST_RECEIVE,
  SectionsActionsTypes,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsTagsInThisListReceive = (data: SectionsState): SectionsActionsTypes => ({
  type: SECTIONS_TAGS_IN_THIS_LIST_RECEIVE,
  data: {
    ...data,
  },
});
