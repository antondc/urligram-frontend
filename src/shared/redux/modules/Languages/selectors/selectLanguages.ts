import { RootState } from 'Modules/rootType';
import { LanguagesState } from '../languages.types';

export const selectLanguages = (state: RootState): LanguagesState => state.Languages;
