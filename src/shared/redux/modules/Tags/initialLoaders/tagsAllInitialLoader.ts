import { ReceiveTagItem, ReceiveTagsResponse, TagsState, TagState } from 'Modules/Tags/tags.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';

export const tagsAllInitialLoader = async (): Promise<{ Tags: TagsState }> => {
  const { data: tagsAllData }: ReceiveTagsResponse = await HttpClient.get('tags');

  const TagsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveTagItem, TagState>({
        data: tagsAllData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Tags: TagsByKey,
  };

  return result;
};
