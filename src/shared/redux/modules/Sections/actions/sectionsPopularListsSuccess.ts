import {
  SECTIONS_MOST_POPULAR_LISTS_LOAD_SUCCESS,
  SectionsActions,
  SectionsState,
} from 'Modules/Sections/sections.types';

export const sectionsPopularListsSuccess = (payload: SectionsState): SectionsActions => ({
  type: SECTIONS_MOST_POPULAR_LISTS_LOAD_SUCCESS,
  payload,
});
