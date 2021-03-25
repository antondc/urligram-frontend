import { TAGS_LOAD_SUCCESS, TagsActions, TagsState } from 'Modules/Tags/tags.types';

export const tagsLoadSuccess = (payload: TagsState): TagsActions => ({
  type: TAGS_LOAD_SUCCESS,
  payload,
});
