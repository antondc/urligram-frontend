import { RootState } from 'Modules/rootType';
import { LinksState } from '../links.types';

export const selectLinks = (state: RootState): LinksState => state.Links;
