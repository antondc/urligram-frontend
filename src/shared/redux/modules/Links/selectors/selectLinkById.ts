import { RootState } from 'Modules/rootType';
import { LinkState } from '../links.types';

export const selectLinkById = (state: RootState, { id }: { id: number }): LinkState => state.Links?.byKey[id];
