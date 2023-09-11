import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { LinksState } from '../links.types';

export const selectLinks = createSelector(
  (state: RootState) => state,
  (state): LinksState => state.Links
);
