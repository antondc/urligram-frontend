import { LOAD_TAGS_SUCCESS, TagsActionsTypes, TagsState } from 'Modules/Tags/tags.types';

export const loadTagsReceive = (data: TagsState): TagsActionsTypes => ({
  type: LOAD_TAGS_SUCCESS,
  data: {
    ...data,
  },
});
