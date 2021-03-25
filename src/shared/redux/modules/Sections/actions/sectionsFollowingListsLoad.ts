import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsFollowingListsRequest } from './sectionsFollowingListsRequest';
import { sectionsFollowingListsSuccess } from './sectionsFollowingListsSuccess';

export const sectionsFollowingListsLoad = (
  sessionId: string
): AppThunk<Promise<ListState[]>, ListsActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  if (!sessionId) return;
  const { Sections: sectionsBeforeApi } = getState();

  try {
    dispatch(
      sectionsFollowingListsRequest({
        ...sectionsBeforeApi,
        FollowingLists: {
          ...sectionsBeforeApi.FollowingLists,
          loading: true,
        },
      })
    );

    const { data }: ListsLoadApiResponse = await HttpClient.get(
      `/users/${sessionId}/lists?page[size]=5&filter[role]=reader,editor`
    );
    const listsArray = data?.map((item) => item.attributes);
    const { Sections: sectionsAfterApi, Lists: listsAfterApi } = getState();

    dispatch(
      listsLoadReceive({
        ...listsAfterApi,
        byKey: {
          ...listsAfterApi.byKey,
          ...serializerFromArrayToByKey<ListState, ListState>({ data: listsArray }),
        },
      })
    );

    dispatch(
      sectionsFollowingListsSuccess({
        ...sectionsAfterApi,
        FollowingLists: {
          ...sectionsAfterApi.FollowingLists,
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      })
    );

    return listsArray;
  } catch (err) {
    throw new Error(err);
  }
};
