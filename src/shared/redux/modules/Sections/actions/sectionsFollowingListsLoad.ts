import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsFollowingListsReceive } from './sectionsFollowingListsReceive';
import { sectionsFollowingListsRequest } from './sectionsFollowingListsRequest';

export const sectionsFollowingListsLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  if (!sessionId) return;

  try {
    dispatch(sectionsFollowingListsRequest());

    const { data }: ListsLoadApiResponse = await HttpClient.get(
      `/users/${sessionId}/lists?page[size]=5&filter[role]=reader,editor`
    );

    const myListsByKey = {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(listsLoadReceive(myListsByKey));

    dispatch(
      sectionsFollowingListsReceive({
        FollowingLists: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
