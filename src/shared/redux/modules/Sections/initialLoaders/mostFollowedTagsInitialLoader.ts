import { SectionsState } from 'Modules/Sections/sections.types';
import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const mostFollowedTagsInitialLoader = async (): Promise<{
  Sections: SectionsState;
}> => {
  const { data: mostFollowedTagsData }: ReceiveTagsResponse = await HttpClient.get('tags');

  const TagsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveTagItem, TagState>({
        data: mostFollowedTagsData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Tags: TagsByKey,
    Sections: {
      MostUsedTags: {
        currentIds: mostFollowedTagsData.map((item) => item.id),
      },
    },
  };

  return result;
};
