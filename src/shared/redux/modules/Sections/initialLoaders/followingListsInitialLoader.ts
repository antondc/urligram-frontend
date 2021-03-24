import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import { SectionsState } from 'Modules/Sections/sections.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const followingListsInitialLoader = async ({ params }: RequestParameters = {}): Promise<{
  Sections: SectionsState;
}> => {
  if (!params?.sessionId) return;

  const { data: followingListsData }: ListsLoadApiResponse = await HttpClient.get(
    `/users/${params?.sessionId}/lists?page[size]=5&filter[role]=reader,editor`
  );

  const ListsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: followingListsData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Lists: ListsByKey,
    Sections: {
      FollowingLists: {
        currentIds: followingListsData.map((item) => item.id),
      },
    },
  };

  return result;
};
