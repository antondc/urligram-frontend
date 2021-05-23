import { RootState } from 'Modules/rootType';
import { LinkState } from '../links.types';

export const selectLinksAll = (state: RootState): LinkState[] => Object.values(state.Links.byKey);
