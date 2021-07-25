import { RootState } from 'Modules/rootType';
import { TagsState } from '../tags.types';

export const selectTags = (state: RootState): TagsState => state.Tags;
