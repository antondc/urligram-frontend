import { RootState } from 'Modules/rootType';
import { SectionsState } from '../sections.types';

export const selectSections = (state: RootState): SectionsState => state.Sections;
