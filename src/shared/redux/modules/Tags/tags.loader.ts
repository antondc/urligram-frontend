import { TagsLoadApiResponse, TagsLoadApiResponseItem, TagsState, TagState } from 'Modules/Tags/tags.types';
import { LoaderResult } from 'Root/src/shared/types/LoaderResult';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const tagsAllInitialLoader = async (): LoaderResult<{ Tags: TagsState }> => {
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
    console.log(error);
  }
};
