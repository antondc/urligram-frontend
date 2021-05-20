import { RootState } from 'Modules/rootType';
import { TagState } from 'Modules/Tags/tags.types';

export const selectTagsAll = (state: RootState): TagState[] => Object.values(state.Tags.byKey);
