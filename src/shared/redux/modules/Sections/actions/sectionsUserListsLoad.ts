import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsUserListsReceive } from './sectionsUserListsReceive';
import { sectionsUserListsRequest } from './sectionsUserListsRequest';

export const sectionsUserListsLoad = (userId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  if (!userId) return;

  try {
    dispatch(sectionsUserListsRequest());

    const { data }: ListsLoadApiResponse = await HttpClient.get(
      `/users/${userId}/lists?page[size]=5&filter[role]=admin`
    );

    const userListsByKey = {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(listsLoadReceive(userListsByKey));

    dispatch(
      sectionsUserListsReceive({
        UserLists: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
