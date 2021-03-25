import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsUserListsReceive } from './sectionsUserListsReceive';
import { sectionsUserListsRequest } from './sectionsUserListsRequest';

export const sectionsUserListsLoad = (
  userId: string
): AppThunk<Promise<ListState[]>, ListsActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  if (!userId) return;
  const { Sections: sectionsBeforeRequest } = getState();
  try {
    dispatch(
      sectionsUserListsRequest({
        ...sectionsBeforeRequest,
        UserLists: {
          ...sectionsBeforeRequest.UserLists,
          loading: true,
        },
      })
    );

    const { data }: ListsLoadApiResponse = await HttpClient.get(
      `/users/${userId}/lists?page[size]=5&filter[role]=admin`
    );
    const { Sections: sectionsAfterResponse, Lists: listsAfterResponse } = getState();
    const listsArray = data.map((item) => item.attributes);

    dispatch(
      listsLoadReceive({
        ...listsAfterResponse,
        byKey: {
          ...listsAfterResponse.byKey,
          ...serializerFromArrayToByKey<ListState, ListState>({ data: listsArray }),
        },
      })
    );

    dispatch(
      sectionsUserListsReceive({
        ...sectionsAfterResponse,
        UserLists: {
          ...sectionsAfterResponse.UserLists,
          currentIds: data.map((item) => item.id),
          loading: false,
        },
      })
    );

    return listsArray;
  } catch (err) {
    throw new Error(err);
  }
};
