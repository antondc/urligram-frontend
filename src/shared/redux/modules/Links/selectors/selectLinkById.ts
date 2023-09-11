import { createSelector } from 'reselect';

import { LinksState, LinkState } from '../links.types';
import { selectLinks } from './selectLinks';

const selectLinkId = (_, { id }): number => id;

export const selectLinkById = createSelector(
  selectLinks,
  selectLinkId,
  (Links: LinksState, id: number): LinkState => Links?.byKey[id]
);
