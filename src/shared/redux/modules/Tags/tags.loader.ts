import { TagsLoadApiResponse, TagsLoadApiResponseItem, TagsState, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { noop, serializerFromArrayToByKey } from '@antoniodcorrea/utils';

export const tagsAllInitialLoader = async (): Promise<{ Tags: TagsState }> => {
  try {
    const { data: tagsAllData }: TagsLoadApiResponse = await HttpClient.get('tags');

    const TagsByKey = {
      byKey: {
        ...serializerFromArrayToByKey<TagsLoadApiResponseItem, TagState>({
          data: tagsAllData,
          contentPath: 'attributes',
        }),
      },
    };

    const result = {
      Tags: TagsByKey,
    };

    return result;
  } catch (error) {
    noop();
  }
};
