import { RootState } from 'Modules/rootType';
import { TagState } from '../tags.types';

export const selectTagsCurrent = (state: RootState): TagState[] =>
  state.Tags?.currentIds.map((tagId) => state.Tags?.byKey[tagId]);
