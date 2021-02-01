import { LOAD_TAGS_STARTED, TagsActionsTypes } from 'Modules/Tags/tags.types';

export const tagsAllRequest = (): TagsActionsTypes => ({
  type: LOAD_TAGS_STARTED,
  data: {
    loading: true,
  },
});
