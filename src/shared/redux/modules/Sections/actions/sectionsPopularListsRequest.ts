import {
  SECTIONS_MOST_POPULAR_LISTS_LOAD_REQUEST,
  SectionsActions,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsPopularListsRequest = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_POPULAR_LISTS_LOAD_REQUEST,
  payload,
});
