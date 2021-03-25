import { SectionsState } from 'Modules/Sections/sections.types';
import { TagsLoadApiResponse, TagsLoadApiResponseItem, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const mostFollowedTagsInitialLoader = async (): Promise<{
  Sections: SectionsState;
}> => {
  const { data: mostFollowedTagsData }: TagsLoadApiResponse = await HttpClient.get('tags');

  const TagsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<TagsLoadApiResponseItem, TagState>({
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
