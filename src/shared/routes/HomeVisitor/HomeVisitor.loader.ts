import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { SectionsState } from 'Modules/Sections/sections.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { ReceiveUserItem, ReceiveUsersResponse, UserState } from '../../redux/modules/Users/users.types';

export const initialHomeVisitorLoader = async (): Promise<{ Sections: SectionsState }> => {
  const { data: popularListsData }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-members&page[size]=5');
  const { data: newListsData }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-createdAt&page[size]=5');
  const { data: usersData }: ReceiveUsersResponse = await HttpClient.get('/users?sort=-createdAt&page[size]=5');

  const ListsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: newListsData,
        contentPath: 'attributes',
      }),
      ...serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: popularListsData,
        contentPath: 'attributes',
      }),
    },
  };
  const UsersByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveUserItem, UserState>({
        data: usersData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Lists: ListsByKey,
    Sections: {
      NewLists: {
        currentIds: newListsData.map((item) => item.id),
      },
      PopularLists: {
        currentIds: popularListsData.map((item) => item.id),
      },
      MostFollowedUsers: {
        currentIds: usersData.map((item) => item.id),
      },
    },
    Users: UsersByKey,
  };

  return result;
};
