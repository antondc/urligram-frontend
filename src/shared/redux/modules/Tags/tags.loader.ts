import { TagsLoadApiResponse, TagsLoadApiResponseItem, TagsState, TagState } from 'Modules/Tags/tags.types';
import { NetworkError } from 'Root/src/shared/types/error/NetworkError';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';

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
    throw new NetworkError('Error when loading tags');
  }
};
