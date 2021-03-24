import { SectionsState } from 'Modules/Sections/sections.types';
import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const myTagsInitialLoader = async ({ params }: RequestParameters = {}): Promise<{
  Sections: SectionsState;
}> => {
  if (!params?.sessionId) return;

  const { data: myTagsData }: ReceiveTagsResponse = await HttpClient.get(
    `/users/${params?.sessionId}/tags?page[size]=10`
  );

  const TagsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveTagItem, TagState>({
        data: myTagsData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Tags: TagsByKey,
    Sections: {
      MyTags: {
        currentIds: myTagsData.map((item) => item.id),
      },
    },
  };

  return result;
};
