import { TAGS_LOAD_REQUEST, TagsActions, TagsState } from 'Modules/Tags/tags.types';

export const tagsLoadRequest = (payload: TagsState): TagsActions => ({
  type: TAGS_LOAD_REQUEST,
  payload,
});
